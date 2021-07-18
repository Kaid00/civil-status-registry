const mongoose = require('mongoose');

const marriageSchema = mongoose.Schema(
  {
    groom_given_name: {
      type: String,
      required: true,
      trim: true,
    },
    groom_surname: {
      type: String,
      required: true,
      trim: true,
      
    },
    groom_father_name: {
      type: String,
      trim: true,
      required: true
    },
    groom_mother_name: {
      type: String,
      trim: true,
      required: true
    },
    bride_father_name: {
      type: String,
      trim: true,
      required: true
    },
    bride_mother_name: {
      type: String,
      trim: true,
      required: true
    },
    groom_date_birth: {
      type: Date,
      required: true,
    },
    bride_date_birth: {
      type: Date,
      required: true,
    },
    groom_place_birth: {
      type: String,
      required: true,
      trim: true,
    },
    groom_id_num: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    bride_place_birth: {
      type: String,
      required: true,
      trim: true,
    },
    bride_id_num: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    bride_given_name: {
      type: String,
      required: true,
      trim: true,
    },
    bride_surname: {
      type: String,
      required: true,
      trim: true,
    },
    date_of_marriage: {
      type: Date,
      required: true,
    },
    place_of_marriage: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

marriageSchema.virtual('groom_age', function () {
  return Date.now().getFullYear - this.groom_date_birth;
});
module.exports = mongoose.model('Marriage', marriageSchema);
