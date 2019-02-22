var express = require('express');
var firebase = require('firebase');
var path = require('path');
var serveStatic = require('serve-static');

var config = {
  apiKey: 'AIzaSyBOq7VmaZni3CDhNYV7QP38uwIV78904oA',
  authDomain: 'resmap-69acb.firebaseapp.com',
  databaseURL: 'https://resmap-69acb.firebaseio.com',
  storageBucket: 'resmap-69acb.appspot.com',
  messagingSenderId: '382528495121'
};

app = express();
app.use(serveStatic(__dirname));

var port = process.env.PORT || 5000;
app.listen(port);

firebase.initializeApp(config);

console.log(`Listening on port ${port}...`);
