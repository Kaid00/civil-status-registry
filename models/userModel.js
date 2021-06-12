const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Tell us your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a vallid email'],
  },
  role: {
    type: String,
    default: 'registrar',
    enum: {
      values: ['admin', 'registrar'],
      message: '{VALUE} is not supported',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  password_cfrm: {
    type: String,
    required: [true, 'Please confirm password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not thesame',
    },
  },

  passwordChangedAt: { type: Date, default: Date.now() },
});

userSchema.pre('save', async function (next) {
  // run if password was modified
  if (!this.isModified('password')) return next();

  // hashing password
  this.password = await bcrypt.hash(this.password, 12);

  // Deleting comfirm password
  this.password_cfrm = undefined;
  next();
});

// instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// checks if user has changed the password
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const lastPasswordChange = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(lastPasswordChange, JWTTimestamp);
    return JWTTimestamp < lastPasswordChange;
  }

  // false means the password was not changed
  return false;
};

module.exports = mongoose.model('User', userSchema);
