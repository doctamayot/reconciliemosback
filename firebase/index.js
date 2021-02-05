var admin = require('firebase-admin');

var serviceAccount = require('../config/keyfire.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://reconciliemos-default-rtdb.firebaseio.com',
});

module.exports = admin;
