const express = require('express');

const marriageController = require('../controllers/marriageController');
const router = express.Router();

router
  .route('/marriage')
  .get(marriageController.getAllCert)
  .post(marriageController.createCert);

router
  .route('/marriage/:id')
  .get(marriageController.getCert)
  .patch(marriageController.updateCert)
  .delete(marriageController.deleteCert);

module.exports = router;
