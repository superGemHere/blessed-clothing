const jwt = require("../lib/jwt");

exports.auth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  console.log("Request cookies", req.cookies);

  if (req.path === '/users/login' || req.path === '/users/register') {
    console.log("inside req path");
    return next();
  }

  if (!accessToken && refreshToken) {
    try {
      console.log("refreshToken but no accessToken", refreshToken);

      const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      console.log("Decoded refresh token", decodedRefreshToken);

      const newAccessToken = await jwt.sign(
        { id: decodedRefreshToken.id, email: decodedRefreshToken.email },
        process.env.SECRET_KEY,
        { expiresIn: "15m" }
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 900000
      });

      res.locals.user = decodedRefreshToken;
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
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError" && refreshToken) {
        console.log("TokenExpiredError but refreshToken", refreshToken);

        try {
          const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

          const newAccessToken = await jwt.sign(
            { id: decodedRefreshToken.id, email: decodedRefreshToken.email },
            process.env.SECRET_KEY,
            { expiresIn: "15m" }
          );

          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
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
    next();
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized, please log in." });
  }

  if (user.email === 'admin@abv.bg') {
    return next();  // User is admin, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};
