const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config');
const { errorHandler } = require('./src/middleware/errorHandler');

const api = require('./src/api');
const { DBManager } = require('./src/db');

const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const dbManager = new DBManager(config);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dbManager.connect();

app.use('/api/v1', api(config));

/// error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found');
  console.log(err);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  console.log('app: ', err);
  res.status(status).send(err);
});

app.use(errorHandler);

module.exports = app;
