const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {transformUsers} = require('./merge');

module.exports = {

  createUser: (args, req) => {
    const inputEmail = args.userInput.email;
    return User.findOne({email: inputEmail}).then(user => {
      if (user) {
        throw new Error('Email Already Exists');
      }
      return bcrypt.hash(args.userInput.password, 12).then(hasedPass => {
        const newUser = new User({
          email: inputEmail,
          password: hasedPass,
          createdRoutes: []
        });
        return newUser.save().then(result => {
          return transformUsers(user);
        });
      })
      .catch(err => {
        throw new Error(err);
      });
    });
  },

  loginUser: (args, req) => {
    return User.findOne({email: args.userInput.email}).then(user => {
      if (!user) {
        throw new Error('Invalid Username Or Password');
      }
      return bcrypt.compare(args.userInput.password, user.password).then(isMatch => {
        if (!isMatch) {
          throw new Error('Invalid Username Or Password');
        }
        const token = jwt.sign({
          userId: user._id,
          email: user.email
        }, process.env.JWT_SECRET, {
          expiresIn: '1h'
        });
        return {
          token: token,
          tokenExpiration: 1,
          userId: user._id
        };
      });
    })
    .catch(err => {
      throw new Error(err);
    });
  }
};
