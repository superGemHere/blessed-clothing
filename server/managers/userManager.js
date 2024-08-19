const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const {constants} = require('../constants.js')

const User = require('../models/User');

exports.register = async (userData) => {
    const user = await User.exists({
        email: userData.email,
    });

    if(user){
        throw new Error("This email is already used.")
    }

    const createdUser = await  User.create(userData);

    const result = getAuthResult(createdUser);
    
    return result;
}
exports.login = async ({email, password}) => {
  const user = await User.findOne({email});

  if(!user){
    throw new Error('Invalid email or password')
  }

  const isValid = await bcrypt.compare(password, user.password);

  if(!isValid){
    throw new Error('Invalid email or password')
  }
  
  const result = getAuthResult(user);

  return result;

}

const getAuthResult = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
      }

      const token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '2d' })

      const result = {
        _id: user._id,
        email: user.email,
        accessToken: token,
    }
      return result;
}