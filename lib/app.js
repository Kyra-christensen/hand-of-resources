const express = require('express');
const req = require('express/lib/request');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/boardGames', require('./controllers/boardGames'));
app.use('/api/v1/songs', require('./controllers/Songs'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
