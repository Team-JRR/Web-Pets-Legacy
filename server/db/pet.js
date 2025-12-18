const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  petName: String,
  training: [Object],
  mood: Number,
  love: Number,
  health: Number
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;