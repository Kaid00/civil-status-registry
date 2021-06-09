const { promisify } = require('util');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password_cfrm: req.body.password_cfrm,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'Success',
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exist and password exist
    if (!email || !password) {
      res.status(400).json({
        status: 'failed',
        message: 'Please provide email and password',
      });
    }
    // check if users and password is correct
    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'failed',
        message: 'Incorrect email or password',
      });
    }
    // if everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'success',
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1) Check if token is there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'You are not loggeg in! Please log in to get access',
      });
    }

    // 2) Verification of the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 3) Check if user still exist
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(
        res.status(401).json({
          status: 'failed',
          message: 'The user belonging to this token no longer exist',
        })
      );
    }

    // 4) Check if user changed password after JWT was issued

    if (freshUser.changePasswordAfter(decoded.iat)) {
      return next(
        res.status(401).json({
          status: 'error',
          message: 'User recently changed password! Please log in again',
        })
      );
    }

    // Grant access to protected routes
    req.users = freshUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
