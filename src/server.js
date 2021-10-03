'use strict'

// 3rd party dependencies
const express = require('express');
// look up how to use morgan
// const morgan = require('morgan');

// Instantiate express
const app = express();

// Use error-handlers
const handle404 = require('./error-handlers/404.js');
const handle500 = require('./error-handlers/500.js');

// Global middleware
// app.use(morgan('dev'));
app.use(express.json());

// Use the routes created in routes files
const clothesRoutes = require('./routes/clothes.js');
const foodRoutes = require('./routes/food.js');
app.use(clothesRoutes);
app.use(foodRoutes);


// Use the error handlers
app.use('*', handle404);
app.use(handle500);

// Export the express app and start method
module.exports = {
    server: app,
    start: port => {
        if (!port) { throw new Error('Missing your Port, Cap\'n'); }
        app.listen(port, () => console.log(`Listening on port ${port}`));
    },
};
