const mongoose = require('mongoose');

const marriageSchema = mongoose.Schema(
  {
    groom_given_name: {
      type: String,
      required: true,
      trim: true,
    },
    groom_profession: {
      type: String,
      required: true,
      trim: true,
    },
    groom_nationality: {
      type: String,
      required: true,
      trim: true,
    },
    groom_born_on: {
      type: Date,
      required: true,
      trim: true,
    },
    groom_resident_at: {
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
    groom_family_head: {
      type: String,
      trim: true,
      required: true
    },
    groom_witness_name: {
      type: String,
      trim: true,
      required: true
    },
    groom_mother_name: {
      type: String,
      trim: true,
      required: true
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

    bride_father_name: {
      type: String,
      trim: true,
      required: true
    },
    bride_family_head: {
      type: String,
      trim: true,
      required: true
    },
    bride_witness_name: {
      type: String,
      trim: true,
      required: true
    },
    bride_mother_name: {
      type: String,
      trim: true,
      required: true
    },
    bride_profession: {
      type: String,
      required: true,
      trim: true,
    },
    bride_nationality: {
      type: String,
      required: true,
      trim: true,
    },
    bride_born_on: {
      type: Date,
      required: true,
      trim: true,
    },
    bride_resident_at: {
      type: String,
      required: true,
      trim: true,
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
    matrimonial_regime: {
      type: String,
      required: true,
      enum: {
        values: ['Separate', 'Joint'],
        message: 'Matrimonial regime is either Separate or Joint ',
      },
    },
    marriage_type: {
      type: String,
      required: true,
      enum: {
        values: ['Polygamy', 'Monogamy'],
        message: 'Marriage type is either Polygamy or Monogamy ',
      },
    },
    objections: {
      type: String,
      required: true,
      enum: {
        values: ['Yes', 'No'],
        message: 'Objections is either Separate or No ',
      },
    },
    drawn_up_on: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


marriageSchema.virtual('groom_fullname').get(function () {
  return this.groom_given_name + ' ' + this.groom_surname;
});

marriageSchema.virtual('bride_fullname').get(function () {
  return this.bride_given_name + ' ' + this.bride_surname;
});
module.exports = mongoose.model('Marriage', marriageSchema);
