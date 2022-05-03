const express = require('express');
const app = express();
const tourRoute = require('./router/tourroute.js');
const userRouter = require('./router/userroute.js');
const morgan = require('morgan');
app.use(express.json()); // qorovulcha

app.use('/api/v1/tours', tourRoute);
app.use('/app/v1/users', userRouter);
app.use(express.static(`${__dirname}/public`))
// app.param('name', (req, res, next, val) => {
//   console.log(val);
//   // next();
// });
module.exports = app;
// app.use((req, res, next) => {
//   if (req) {
//     req.time = new Date();
//   } else req.time = new Date();
//   // console.log(res);
//   if (!res) {
//     res.time = new Date();
//   } else {
//     res.time = new Date();
//   }

//   next();
//   console.log(req.time);
// });
// app.use(morgan('combined'));

// app.get('/api/v1/reveiw', tourGetAll);

// app.get('/api/v1/tours', rewiewgetAll);
// app.post('', postTour);

// app.get('/api/v1/tours/:id', getIdTour);
// app.patch('/api/v1/tours/:id', patchId);
// app.delete('/api/v1/tours/:id', deleteId);
// user routing
