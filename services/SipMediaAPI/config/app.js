const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const consign = require('consign');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport')(passport);
const jwt = require('jsonwebtoken');
const config = require('./index.js');
const database = require('./database')(mongoose, config);

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.set('jwtsecret', config.secret);

consign({ cwd: 'services' })
    .include('SipMediaAPI/app/setup')
    .then('SipMediaAPI/app/api')
    .then('SipMediaAPI/app/routes')
    .into(app);
module.exports = app;