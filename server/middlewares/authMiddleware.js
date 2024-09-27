const jwt = require("../lib/jwt");

exports.auth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && refreshToken) {
    try {
      console.log("refreshToken but no accessToken", refreshToken);

      const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      console.log("Decoded refresh token", decodedRefreshToken);

      const newAccessToken = await jwt.sign(
        { userId: decodedRefreshToken.userId, email: decodedRefreshToken.email },
        process.env.SECRET_KEY,
        { expiresIn: "15m" }
      );
      const decodedAccessToken = await jwt.verify(newAccessToken, process.env.SECRET_KEY);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 900000
      });

      res.locals.user = refreshToken;
      return next();
    } catch (refreshError) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(401).json({ message: "Invalid refresh token, please log in again." });
    }
  }

  if (accessToken) {
    try {
      const decodedToken = await jwt.verify(accessToken, process.env.SECRET_KEY);
      res.locals.user = decodedToken;
      console.log("Decoded access token", decodedToken);
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError" && refreshToken) {
        console.log("TokenExpiredError but refreshToken", refreshToken);

        try {
          const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

          const newAccessToken = await jwt.sign(
            { userId: decodedRefreshToken.userId, email: decodedRefreshToken.email },
            process.env.SECRET_KEY,
            { expiresIn: "15m" }
          );

          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 900000
          });

          res.locals.user = decodedRefreshToken;
          return next();
        } catch (refreshError) {
          res.clearCookie("accessToken");
          res.clearCookie("refreshToken");
          return res.status(401).json({ message: "Invalid refresh token, please log in again." });
        }
      } else {
        return res.status(401).json({ message: "Invalid or expired access token." });
      }
    }
  } else {
    // res.status(401).json({ message: "Unauthorized, please log in." });
    return next();
  }
};

// Middleware to check if the user is an admin
exports.isAuth = (req, res, next) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized, please log in." });
  }

  return next();  // User is authenticated, proceed to the next middleware or route handler
};

exports.isAdmin = (req, res, next) => {
  const user = res.locals.user;
  console.log("User", user);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized, please log in." });
  }

  if (user.email === 'admin@abv.bg') {
    return next();  // User is admin, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};
