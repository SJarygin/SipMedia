module.exports = (AMongoose, AConfig) => {
  const database = AMongoose.connection;
  AMongoose.Promise = Promise;
  AMongoose.connect(AConfig.database, {
//    useMongoClient: true,
    promiseLibrary: global.Promise
  });
  database.on('error', AError => console.log(`Connection to SipMedia database failed: ${AError}`));
  database.on('connected', () => console.log('Connected to SipMedia database'));
  database.on('disconnected', () => console.log('Disconnected from SipMedia database'));
  process.on('SIGINT', () => {
    database.close(() => {
      console.log('SipMedia terminated, connection closed');
      process.exit(0);
    })
  });
};