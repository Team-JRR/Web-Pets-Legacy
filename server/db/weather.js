
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: String,
  condition: String,
  temperature: Number,
}, { timestamps: true });

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
