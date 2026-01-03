
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: String,
  condition: String,
  temperature: Number,
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
