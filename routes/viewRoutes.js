const express = require('express');
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.isLoggedIn)

router.get('/',authController.isLoggedIn, viewController.home);
router.get('/dashboard',authController.protect, viewController.dashboard)

router.get('/birth',authController.protect, viewController.birth)

router.get('/marriage',authController.protect, viewController.marriage)

router.get('/upload',authController.protect, viewController.upload)
router.get('/login', viewController.login)

router.get('/generate-birth-certificate',authController.protect, viewController.generateBirth )





module.exports = router;