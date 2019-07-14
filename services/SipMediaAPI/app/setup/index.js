const mongoose = require('mongoose');
const UserModel = require('@SipMediaModels/user');

const models = {
  User: mongoose.model('User')
};

module.exports = models;