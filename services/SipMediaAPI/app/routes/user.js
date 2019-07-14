const passport = require('passport');
const config = require('@config');
const models = require('@SipMedia/app/setup');

module.exports = (App) => {
  const api = App.SipMediaAPI.app.api.user;
  App.route('/api/v1/setup')
      .post(api.setup(models.User));

  App.route('/api/v1/users')
      .get(passport.authenticate('jwt', config.session), api.index(models.User, App.get('jwtsecret')));

  App.route('/api/v1/signup')
      .post(api.signup(models.User));
};