const Birth = require('../models/birthModel');
const APIFeatures = require('../utils/apiFeatures');

// Display list of all Birth Certificates
exports.getAllBirthCert = async (req, res) => {
  try {
    //  EXECUTE QUERY
    const features = new APIFeatures(Birth.find(), req.query)
      .filter()
      .sort()
      .fieldLimiting()
      .paginate();

    const birth = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      length: birth.length,
      data: {
        birth,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

// Display detail page for sepicifc Birth Certificate
exports.getBirthCert = async (req, res) => {
  try {
    const birth = await Birth.findById(req.params.id);
    if (birth != null) {
      res.status(200).json({
        status: 'Success',
        data: {
          birth,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

// Delete specific Birth Certificate
exports.deleteBirthCert = async (req, res) => {
  try {
    await Birth.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

// Create Birth Certificate on POST
exports.createBirthCert = async (req, res) => {
  try {
    const newBirth = await Birth.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        newBirth,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

// Update specific birth certificate
exports.updateBirthCert = async (req, res) => {
  try {
    const birth = await Birth.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'Success',
      updated: {
        birth,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
