const express = require('express');
const router = express.Router();
const birthController = require('../controllers/birthController');
const authController = require('../controllers/authController');

router
  .route('/birth')
  .get(authController.protect, birthController.getAllBirthCert)
  .post(authController.protect, birthController.createBirthCert);

router
  .route('/birth/:id')
  .get(authController.protect, birthController.getBirthCert)
  .patch(authController.protect, birthController.updateBirthCert)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    birthController.deleteBirthCert
  );

module.exports = router;
