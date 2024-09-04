const jwt = require("../lib/jwt");

exports.auth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      res.user = decodedToken;
      next();
    } catch (err) {
      res.status(401).json({ message: "Access token expired or invalid." });
    }
  } else {
    next();
  }
};
