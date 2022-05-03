const express = require('express');
const tourcont = require('../Conroller/tourConstrol');
const tourRoute = express.Router();

tourRoute.route('/').get(tourcont.rewiewgetAll).post(tourcont.postTour);
tourRoute
  .route('/:id')
  .get(tourcont.getIdTour)
  .patch(tourcont.patchId)
  .delete(tourcont.deleteId);

module.exports = tourRoute;
