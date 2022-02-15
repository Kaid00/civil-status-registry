const express = require('express');

const marriageController = require('../controllers/marriageController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/marriage')
  .get(authController.protect, marriageController.getAllCert)
  .post(authController.protect, marriageController.createCert);

router
  .route('/marriage/:id')
  .get(authController.protect, marriageController.getCert)
  .patch(authController.protect, marriageController.updateCert)
  .delete(authController.protect, marriageController.deleteCert);

module.exports = router;
