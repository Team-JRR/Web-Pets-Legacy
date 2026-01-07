const mongoose = require('mongoose');

const colorValidator = (v) => { return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v); };

const userSchema = new mongoose.Schema({
  name: String,
  petsAdopted: Number,
  petsDisappeared: Number,
  status: String,
  deviceColor: { type: String, default: '#87cefa', validate: { validator: colorValidator, message: props => `${props.value} is not a valid hex color format!`}, require: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
