const express = require('express');
const tourcont = require('../Conroller/tourConstrol');
const tourModel = require('../model/tourModel');
const tourRoute = express.Router();

tourRoute.route('/stats').get(tourcont.stats);
tourRoute.route('/best-3-tours').get(tourcont.rewiewgetAll);

tourRoute.route('/').get(tourcont.rewiewgetAll).post(tourcont.postTour);
tourRoute
  .route('/:id')
  .get(tourcont.getIdTour)
  .patch(tourcont.patchId)
  .delete(tourcont.deleteId);

module.exports = tourRoute;
