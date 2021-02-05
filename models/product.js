const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
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
    /* description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    }, */
    numero: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 4,
      text: true,
    },

    category: {
      type: ObjectId,
      ref: 'Category',
    },
    subs: [
      {
        type: ObjectId,
        ref: 'Sub',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
