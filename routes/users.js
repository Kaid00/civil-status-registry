const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

// Create new user
router.post('/signup', authController.signup);
router.post('/login', authController.login);

/* GET users listing. */
router.get('/', userController.allUser);

module.exports = router;
