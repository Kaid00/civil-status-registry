const mongoose = require('mongoose');

const birthSchema = mongoose.Schema({
  surname: {
    type: String,
    required: [true, 'Why no Surname'],
    maxLength: 100,
    trim: true,
  },
  givenname: {
    type: String,
    required: [true, 'Why no Given name'],
    maxLength: 100,
    trim: true,
  },
  born_at: {
    type: String,
    required: true,
    trim: true,
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
    trim: true,
  },
  father_born_at: {
    type: String,
    required: true,
    trim: true,
  },
  father_born_on: {
    type: String,
    required: true,
  },
  father_resident_at: {
    type: String,
    required: true,
    trim: true,
  },
  father_occupation: {
    type: String,
    required: true,
    trim: true,
  },
  father_nationality: {
    type: String,
    required: true,
    default: 'Cameroon',
    trim: true,
  },
  father_ref_doc: {
    type: Number,
    required: true,
    unique: true,
  },
  mother_name: {
    type: String,
    required: true,
    trim: true,
  },
  mother_born_at: {
    type: String,
    required: [true, 'Mothers place of birth must be specified'],
    trim: true,
  },
  mother_resident_at: {
    type: String,
    required: [true, 'Mothers resident must be specified'],
    trim: true,
  },
  mother_occupation: {
    type: String,
    trim: true,
  },
  mother_born_on: {
    type: Date,
    required: [true, 'Mother must have a date of birth'],
  },
  mother_ref_doc: {
    type: Number,
    required: [true, 'Mother must have a National Id Number'],
    unique: true,
  },
  mother_nationality: {
    type: String,
    required: [true, 'Mother must have a nationality'],
    default: 'Cameroon',
    trim: true,
  },
  drawn_up_on: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('birth', birthSchema);
