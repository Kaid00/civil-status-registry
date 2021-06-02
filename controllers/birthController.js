const Birth = require('../models/birth');

// Display list of all Birth Certificates
exports.getAllBirthCert = async (req, res) => {
  try {
    // BUILD QUERY
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
      return `$${match}`;
    });

    console.log(JSON.parse(queryStr));

    let query = Birth.find(JSON.parse(queryStr));

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-drawn_up_on');
    }

    // FIELD Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //  EXECUTE QUERY
    const birth = await query;

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
      changed: {
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
