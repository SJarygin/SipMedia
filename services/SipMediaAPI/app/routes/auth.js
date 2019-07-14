const models = require('@SipMedia/app/setup');

module.exports = (App) => {
  const api = App.SipMediaAPI.app.api.auth;

  App.route('/')
      .get((AReq, ARes) => ARes.send('SipMedia API'));

  App.route('/api/v1/auth')
      .post(api.login(models.User));
};