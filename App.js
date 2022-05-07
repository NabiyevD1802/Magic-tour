const express = require('express');
const app = express();
const tourRoute = require('./router/tourroute.js');
const userRouter = require('./router/userroute.js');
const morgan = require('morgan');
app.use(express.json()); // qorovulcha

app.use((req, res, next) => {
  if (req.path === '/api/v1/tours/best-3-tours') {
    req.query.sort = '-ratingsAverage';
    req.query.limit = 3;
  }
  next();
});

app.use('/api/v1/tours', tourRoute);
app.use('/app/v1/users', userRouter);
app.use(express.static(`${__dirname}/public`));

module.exports = app;
