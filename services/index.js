require('module-alias/register');
console.log('process.env.JWTSECRET: ' + (process.env.JWTSECRET !== undefined));
const http = require('http');
const SipMediaAPI = require('@SipMediaAPI');
const SipMediaServer = http.Server(SipMediaAPI);
const SipMediaPORT = process.env.PORT || 3000;
const LOCAL = '0.0.0.0';

SipMediaServer.listen(SipMediaPORT, LOCAL, () => console.log(`SipMediaAPI running on ${SipMediaPORT}`));