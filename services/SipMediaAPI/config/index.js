module.exports = {
  secret: process.env.JWTSECRET || 'test+test=test',
  session: { session: false },
  database: 'mongodb://127.0.0.1:27017/sipmedia'
};