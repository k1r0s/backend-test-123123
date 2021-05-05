import mongoose from 'mongoose';

const products = new mongoose.Schema({
  reference: {
    type: String,
  },
  description: {
    type: String,
  },
  weight: Number,
  height: Number
}, { timestamp: true, strict: false });

module.exports = mongoose.model('Products', products);
