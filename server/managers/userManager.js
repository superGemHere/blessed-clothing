const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const extractErrorMessage = require("../utils/errorMsgHandler.js");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

exports.register = async userData => {
  try {
    // Check if the email is already in use
    // const userExists = await User.exists({ email: userData.email });
    // if (userExists) throw new Error("This email is already used.");

    // Create the new user
    const createdUser = await User.create(userData);

    // Generate authentication result
    const { accessToken, refreshToken } = await getAuthResult(createdUser);

    // Store the refresh token in MongoDB
    await RefreshToken.create({
      userId: createdUser._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    return {
      _id: createdUser._id,
      email: createdUser.email,
      accessToken,
      refreshToken
    };
  } catch (err) {
    const message = extractErrorMessage(err);
    throw new Error(message);
  }
};

exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid email or password");

    const { accessToken, refreshToken } = await getAuthResult(user);

    // Store the refresh token in MongoDB
    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    return {
      _id: user._id,
      email: user.email,
      accessToken,
      refreshToken
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAuthResult = async user => {
  const payload = {
    _id: user._id,
    email: user.email
  };

  const accessToken = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "15m"
  });
  const refreshToken = await jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d"
  });

  return { accessToken, refreshToken };
};
