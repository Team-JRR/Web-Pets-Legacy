const mongoose = require('mongoose');

const User = require('./user');
const Credential = require('./credential');
const Pet = require('./pet');

// TODO: some way to wait for connection
mongoose.connect('mongodb://127.0.0.1:27017/webpets')
  .then(() => {
    console.info('Connected to the database.');
    return;
  });

module.exports = {
  User,
  Credential,
  Pet,
};
