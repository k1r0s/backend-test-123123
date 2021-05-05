import mongoose from 'mongoose';

const deliveries = new mongoose.Schema({
  when: Date,
  origin: {
    street: String,
    number: String,
    postalCode: String,
    city: String,
  },
  destination: {
    street: String,
    number: String,
    postalCode: String,
    city: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
    }
  ],
}, { timestamp: true, strict: false });


module.exports = mongoose.model('Deliveries', deliveries);
