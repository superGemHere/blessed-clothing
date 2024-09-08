const jwt = require("../lib/jwt");

exports.auth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    // No access token and no refresh token, proceed without authentication
    return next();
  }

  // If no access token but refresh token exists, create a new access token
  if (!accessToken && refreshToken) {
    try {
      // Verify the refresh token
      const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      console.log("refreshToken but no accessToken", decodedRefreshToken);

      // Generate a new access token from the refresh token
      const newAccessToken = await jwt.sign(
        { id: decodedRefreshToken.id, email: decodedRefreshToken.email },
        process.env.SECRET_KEY,
        { expiresIn: "1m" } // Set access token expiration time (e.g., 15 minutes)
      );

      // Set the new access token as a cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60000 // Set cookie to expire in 15 minutes
      });

      // Attach the user information to the request object
      res.locals.user = decodedRefreshToken;

      // Proceed to the next middleware
      return next();
    } catch (refreshError) {
      // If the refresh token is invalid, clear cookies and return unauthorized
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(401).json({ message: "Invalid refresh token, please log in again." });
    }
  }

  // If access token exists, verify it
  try {
    const decodedToken = await jwt.verify(accessToken, process.env.SECRET_KEY);
    // Attach the decoded user information to the request object
    res.locals.user = decodedToken;
    // Proceed to the next middleware
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError" && refreshToken) {
      // If the access token has expired but refresh token exists, try to refresh the access token
      try {
        const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

        // Generate a new access token from the refresh token
        const newAccessToken = await jwt.sign(
          { id: decodedRefreshToken.id, email: decodedRefreshToken.email },
          process.env.SECRET_KEY,
          { expiresIn: "1m" } // Set new access token expiration time (e.g., 15 minutes)
        );

        // Set the new access token as a cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 60000 // Set cookie to expire in 15 minutes
        });

        // Attach the user from the refresh token to the request object
        res.locals.user = decodedRefreshToken;

        // Proceed to the next middleware
        return next();
      } catch (refreshError) {
        // If refresh token is invalid, clear cookies and return unauthorized
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).json({ message: "Invalid refresh token, please log in again." });
      }
    } else {
      // Other errors (e.g., invalid access token)
      return res.status(401).json({ message: "Invalid or expired access token." });
    }
  }
};
