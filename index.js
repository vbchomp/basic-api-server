'use strict'

// Require in the server and database
require('dotenv').config();
const server = require('./src/server.js');
const { db } = require('./src/models/index.js');

// Sync the database and start the server. Catch errors and console log them.
db.sync()
  .then(() => {
  server.start(3000);
})
  .catch(console.error);