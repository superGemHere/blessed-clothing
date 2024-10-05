const router = require("express").Router();
const jwt = require("../lib/jwt");
const userManager = require("../managers/userManager");
const RefreshToken = require("../models/RefreshToken");

// Utility function to clear cookies
const clearCookies = res => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    expires: new Date(0)
  });
  // res.cookie("refreshToken", "", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "None",
  //   expires: new Date(0)
  // });
};

router.post("/register", async (req, res) => {
  try {
    const result = await userManager.register(req.body);
    const { accessToken, refreshToken } = result;
    const isProduction = process.env.NODE_ENV === 'production';
    const userId = result._id;

    // Remove any existing refresh tokens for this user
    await RefreshToken.deleteMany({ userId: userId });

    // Store the new refresh token in the database
    await RefreshToken.create({
      userId: userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,   // Use `secure` only in production (for HTTPS)
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 900000 // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,   // Use `secure` only in production (for HTTPS)
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await userManager.login(req.body);
    const { accessToken, refreshToken } = result;
    const isProduction = process.env.NODE_ENV === 'production';
    const userId = result._id;

    // Remove any existing refresh tokens for this user
    await RefreshToken.deleteMany({ userId: userId });

    // Store the new refresh token in the database
    await RefreshToken.create({
      email: result.email,
      userId: userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,   // Use `secure` only in production (for HTTPS)
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 900000 // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,   // Use `secure` only in production (for HTTPS)
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/logout", async (req, res) => {
  const { refreshToken } = req.cookies;

  const isProduction = process.env.NODE_ENV === 'production';
  
  if (refreshToken) {
    try {
      // Verify and decode the refresh token
      const decoded = await jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY
      );
      if (decoded && decoded.userId) {
        // Remove the refresh token from the database
        await RefreshToken.findOneAndDelete({
          userId: decoded.userId,
          token: refreshToken
        });
        console.log(
          "Refresh token deleted successfully for user:",
          decoded.userId
        );
      } else {
        console.log("Invalid token payload:", decoded);
      }
    } catch (err) {
      console.error("Error decoding refresh token:", err);
    }
  } else {
    console.log("No refresh token found in cookies.");
  }

  // Clear cookies
  // clearCookies(res);
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax"
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax"
  });
  res.status(200).json({ message: "Logged out successfully" });
});

router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const isProduction = process.env.NODE_ENV === 'production';
  // console.log("RefreshToken endpoint", refreshToken);
  
  if (!refreshToken) return res.status(401).json({ message: "No refresh token found" });

  try {
    const decoded = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    const storedToken = await RefreshToken.findOne({ userId: decoded.userId, token: refreshToken });
    // console.log("decoded user id", decoded.userId);
    // console.log("Decoded Token", decoded);
    // console.log("Stored Token", storedToken);

    if (!storedToken || storedToken.expiresAt < Date.now()) {
      res.cookie("accessToken", "", {
        httpOnly: true,
        secure: isProduction,   // Use `secure` only in production (for HTTPS)
        sameSite: isProduction ? "None" : "Lax", // Use "None" in production (if cross-site) and "Lax" for local development
        expires: new Date(0)    // Token expiration (clear the cookie)
      }); // Clear cookies if the refresh token is invalid or expired
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }


    // Generate new tokens
    const newAccessToken = await jwt.sign({ userId: decoded.userId, email: decoded.email }, process.env.SECRET_KEY, { expiresIn: "1m" });
    const newRefreshToken = await jwt.sign({ userId: decoded.userId, email: decoded.email  }, process.env.REFRESH_SECRET_KEY, { expiresIn: "7d" });

    // Update stored refresh token
    await RefreshToken.findOneAndUpdate(
      { userId: decoded.userId, token: refreshToken },
      { token: newRefreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      { new: true }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProduction,   // Use `secure` only in production (for HTTPS)
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 900000 // 15 minutes
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProduction,   // Use `secure` only in production (for HTTPS)
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    // clearCookies(res); // Clear cookies if refresh token verification fails
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

router.get("/getAccessToken", async (req, res) => {
  const token = req.cookies.accessToken;
  // console.log("AccessToken Get",accessToken)

  if (!token) return res.status(401).json({ message: "No access token found" });

  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    res
      .status(200)
      .json({
        accessToken: token,
        email: decodedToken.email,
        userId: decodedToken.userId
      });
  } catch (err) {
    res.status(401).json({ message: "Invalid access token" });
  }
});

module.exports = router;
