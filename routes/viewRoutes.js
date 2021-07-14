const express = require('express');
const viewController = require('../controllers/viewController')

const router = express.Router();

router.get('/', viewController.home);
router.get('/dashboard', viewController.dashboard)

router.get('/birth', viewController.birth)

router.get('/marriage', viewController.marriage)

router.get('/upload', viewController.upload)
router.get('/login', viewController.login)




module.exports = router;