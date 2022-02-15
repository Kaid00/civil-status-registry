const express = require('express');
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')


const router = express.Router();

router.use(authController.isLoggedIn)

router.get('/',authController.isLoggedIn, viewController.home);
router.get('/dashboard', viewController.dashboard)

router.get('/birth', viewController.birth)

router.get('/marriage', viewController.marriage)

router.get('/upload', viewController.upload)
router.get('/login', viewController.login)

// Dashboard renders of generated certificates
router.get('/generate-birth-certificate', viewController.generateBirth, )
router.get('/generate-marriage-certificate', viewController.generateMarriage, )

router.get('/print-ready-marriage', viewController.generateMarriagePrint, )

router.get('/print-ready', viewController.generateBirthPrint, )

// Create a pdf of the birth certificate
router.get('/create-birth-pdf', viewController.puppetBirth)
router.get('/create-marriage-pdf', viewController.puppetMarriage)

router.get('/test', viewController.test)

router.get('/birth-pdf', viewController.sendBirthPdf)

router.get('/marriage-pdf', viewController.sendMarriagePdf)





module.exports = router;