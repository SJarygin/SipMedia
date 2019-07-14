const PassportJWT = require('passport-jwt');
const ExtractJWT = PassportJWT.ExtractJwt;
const Strategy = PassportJWT.Strategy;
const config = require('./index.js');
const models = require('@SipMedia/app/setup');

module.exports = (APassport) => {
  const User = models.User;
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  };
  APassport.use(new Strategy(parameters, (APayload, ADone) => {
    User.findOne({ id: APayload.id }, (AError, AUser) => {
      if (AError) return ADone(AError, false);
      if (AUser) ADone(null, AUser);
      else ADone(null, false);
    });
  }));
};