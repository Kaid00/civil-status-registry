const express = require('express');
const router = express.Router();
const birthController = require('../controllers/birthController');
const authController = require('../controllers/authController');

router
  .route('/birth')
  .get(authController.protect, birthController.getAllBirthCert)
  .post(birthController.createBirthCert);

router
  .route('/birth/:id')
  .get(birthController.getBirthCert)
  .patch(birthController.updateBirthCert)
  .delete(birthController.deleteBirthCert);

module.exports = router;
