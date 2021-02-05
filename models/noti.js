const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const notiSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
      text: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    tipo: {
      type: String,
      enum: ['Convocado', 'Convocante', 'Apoderado'],
    },
    /* images: {
      type: Array,
    }, */

    product: [
      {
        type: ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Noti', notiSchema);
