const mongoose = require('mongoose');

const api = {};

api.setup = (AUserModel) => (AReq, ARes) => {
  const admin = new AUserModel({
    username: 'admin',
    password: 'admin',
    clients: []
  });

  admin.save(AError => {
    if (AError) throw AError;
    console.log('Admin account was succesfully set up');
    ARes.json({ success: true });
  })
};

api.index = (AUserModel, AToken) => (AReq, ARes) => {
  const token = AToken;
  if (token) {
    AUserModel.find({}, (AError, AUsers) => {
      if (AError) throw AError;
      ARes.status(200).json(AUsers);
    });
  } else {
    return ARes.status(403).send({ success: false, message: 'Unauthorized' });
  }
};

api.signup = (AUserModel) => (AReq, ARes) => {
  if (!AReq.body.username || !AReq.body.password) {
    ARes.json({ success: false, message: 'Please, pass a username and password.' });
  } else {
    const newUser = new AUserModel({
      username: AReq.body.username,
      password: AReq.body.password,
      clients: []
    });
    newUser.save((AError) => {
      if (AError) {
        return ARes.status(400).json({ success: false, message: 'Username already exists.' });
      }
      ARes.json({ success: true, message: 'Account created successfully' });
    })
  }
};

module.exports = api;