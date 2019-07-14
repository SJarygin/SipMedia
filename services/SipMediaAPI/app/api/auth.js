const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('@config');

const authFailedMessage = 'Authentication failed. User not found or wrong password.';
const api = {};

api.login = (AUserModel) => (AReq, ARes) => {
  AUserModel.findOne({ username: AReq.body.username }, (AError, AUser) => {
    if (AError) throw AError;

    if (!AUser) ARes.status(401).send({ success: false, message: authFailedMessage });
    else {
      AUser.comparePassword(AReq.body.password, (AError, AMatches) => {
        if (AMatches && !AError) {
          const token = jwt.sign({ user: AUser }, config.secret);
          ARes.json({ success: true, message: 'Token granted', token });
        } else {
          ARes.status(401).send({ success: false, message: authFailedMessage });
        }
      });
    }
  });
};

api.verify = (AHeaders) => {
  if (AHeaders && AHeaders.authorization) {
    const split = AHeaders.authorization.split(' ');
    if (split.length === 2) return split[1];
    else return null;
  } else return null;
};

module.exports = api;