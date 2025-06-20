// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  PreferredDeliveryTime: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
