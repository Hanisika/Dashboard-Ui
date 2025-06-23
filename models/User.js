const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
}, { collection: 'users' }); // 👈 This forces it to use the 'users' collection

module.exports = mongoose.model('User', userSchema);