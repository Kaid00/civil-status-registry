const { promisify } = require('util');
const sendEmail = require('../utils/email');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, status, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions).status(status).json({
    status: 'Success',
    token,
    data: {
      user,
    },
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
      role: req.body.role,
    });

    createSendToken(newUser, 201, res);
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
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: 'success',
      message: err,
    });
  }
};

// Protected Routes
exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1) Check if token is there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (token === null) {
      throw 'You are not logged in! Please login to gain access';
    }

    // 2) Verification of the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 3) Check if user still exist
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      throw 'The user belonging to this token no longer exist';
    }

    // 4) Check if user changed password after JWT was issued
    if (freshUser.changePasswordAfter(decoded.iat)) {
      throw 'User recently changed password! Please log in again';
    }

    // Grant access to protected routes
    req.users = freshUser;

    next();
  } catch (Error) {
    res.status(401).json({
      status: 'failed',
      message: Error,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.users.role)) {
      res.status(403).json({
        status: 'Failed',
        message: 'You do not have permission to perform this action',
      });
    }

    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) Get user based on posted Email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(
        res.status(404).json({
          status: 'failed',
          message: 'User does not exist',
        })
      );
    }
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();

    // saves the reset token and expiration times to the user document this instance of User
    await user.save({ validateBeforeSave: false });

    // 3) Send token to the users email
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordComfirm to: ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token {only valid for 10min}',
        message,
      });
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save({ validateBeforeSave: false });

      return next(
        res.status(500).json({
          status: 'failed',
          message: 'There was an error sending the email try again later',
          error: err,
        })
      );
    }
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on a token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    // 2) Set new password if token has not expired and there is a user
    if (!user) {
      return next(
        res.status(400).json({
          status: 'failed',
          message: 'Token is invalid or has expired',
          error: err,
        })
      );
    }

    user.password = req.body.password;
    user.password_cfrm = req.body.password_cfrm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    // 3) Update changedPasswordAt property for the current user

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
  next();
};

// exports.updatePassword = async (req, res, next) => {
//   try {
//     // 1) Get user from the collection
//     const user = await Users.findById(req.user.id).select('+password');
//     console.log(req.user.id);
//     // 2) Check if the posted passowrd is correct
//     if (
//       !(await user.correctPassword(req.body.passwordCurrent, user.password))
//     ) {
//       return next(
//         res.status(401).json({
//           status: 'failed',
//           message: 'Your current password is wrong',
//         })
//       );
//     }
//     // 3) If the password is correct then update
//     user.password = req.body.password;
//     user.password_cfrm = req.body.password_cfrm;
//     await user.save();

//     // 4) Log user in, send JWT
//     const token = signToken(user._id);
//     res.status(200).json({
//       status: 'success',
//       token,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };
