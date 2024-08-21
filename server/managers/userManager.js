const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const extractErrorMessage = require('../utils/errorMsgHandler.js')
const { constants } = require("../constants.js");

const User = require("../models/User");

exports.register = async (userData) => {
  try {
    // Check if the email is already in use
    // const userExists = await User.exists({
    //   email: userData.email
    // });

    // if (userExists) {
    //   throw new Error("This email is already used.");
    // }

    // Create the new user
    const createdUser = await User.create(userData);

    // Generate authentication result (e.g., token, user data, etc.)
    const result = getAuthResult(createdUser);

    return result;

  } catch (err) {
    // Handle specific error cases
    const message = extractErrorMessage(err)
    throw new Error(message)
  }
};

exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    const result = await getAuthResult(user);

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
    
};

const getAuthResult = async user => {
  const payload = {
    _id: user._id,
    email: user.email
  };

  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "2d"
  });

  const result = {
    _id: user._id,
    email: user.email,
    accessToken: token
  };
  return result;
};
