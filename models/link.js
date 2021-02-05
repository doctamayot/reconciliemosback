const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
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

    tipos: {
      type: String,
      enum: ['Notificacion', 'Solicitud', 'Evento'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Link', linkSchema);
