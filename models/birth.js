const mongoose = require('mongoose');

const birthSchema = mongoose.Schema({
  surname: {
    type: String,
    required: [true, 'Why no Surname'],
    maxLength: 100,
  },
  givenname: {
    type: String,
    required: [true, 'Why no Given name'],
    maxLength: 100,
  },
  born_at: {
    type: String,
    required: true,
  },
  born_on: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  father_name: {
    type: String,
    required: true,
  },
  father_born_at: {
    type: String,
    required: true,
  },
  father_born_on: {
    type: String,
    required: true,
  },
  father_resident_at: {
    type: String,
    required: true,
  },
  father_occupation: {
    type: String,
    required: true,
  },
  father_nationality: {
    type: String,
    required: true,
    default: 'Cameroon',
  },
  father_ref_doc: {
    type: Number,
    required: true,
    unique: true,
  },
  mother_name: {
    type: String,
    required: true,
  },
  mother_born_at: {
    type: String,
    required: true,
  },
  mother_resident_at: {
    type: String,
    required: true,
  },
  mother_occupation: {
    type: String,
    required: true,
  },
  mother_born_on: {
    type: Date,
    required: true,
  },
  mother_ref_doc: {
    type: Number,
    required: true,
    unique: true,
  },
  mother_nationality: {
    type: String,
    required: true,
    default: 'Cameroon',
  },
  drawn_up_on: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('birth', birthSchema);
