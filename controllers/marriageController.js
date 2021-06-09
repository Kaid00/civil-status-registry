const Marriage = require('../models/marriageModel');
const APIFeatures = require('../utils/apiFeatures');

// Get all cetificates
exports.getAllCert = async (req, res) => {
  try {
    const features = new APIFeatures(Marriage.find(), req.query)
      .filter()
      .sort()
      .fieldLimiting()
      .paginate();

    const marriage = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      length: marriage.length,
      data: {
        marriage,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

// Create certificate
exports.createCert = async (req, res) => {
  try {
    const marriage = await Marriage.create(req.body);

    res.status(202).json({
      status: 'success',
      data: {
        marriage,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

// Get specific certificate
exports.getCert = async (req, res) => {
  try {
    const marriage = await Marriage.findById(req.params.id);
    if (marriage != null) {
      res.status(200).json({
        status: 'Success',
        data: {
          marriage,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

// Update Certificate
exports.updateCert = async (req, res) => {
  try {
    const marriage = await Marriage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'Success',
      updated: {
        marriage,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

// Delete certificate
exports.deleteCert = async (req, res) => {
  try {
    await Marriage.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
