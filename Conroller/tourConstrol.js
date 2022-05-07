const Tour = require('../model/tourModel');
const APIFeatures = require('../helper/APIFeatures');

const rewiewgetAll = async (req, res) => {
  try {
    let data = new APIFeatures(Tour, req.query).filter().sort().field().page();

    const queryData = await data.surov;
    if (req.query.page) {
      const numberOfDocuments = await Tour.countDocuments();
      if (numberOfDocuments < (req.query.page - 1) * req.query.limit) {
        throw new Error('This page does not exsist');
      }
    }
    if (queryData.length) {
      res.status(200).json({
        status: 'succes',
        results: queryData.length,
        data: queryData,
      });
    } else {
      throw new Error('Error');
    }
  } catch (err) {
    res.status(200).json({
      status: 'fail',
      message: err.message,
    });
  }
};
const postTour = async (req, res) => {
  try {
    const data = await Tour.create(req.body);
    res.status(201).json({
      status: 'succes',
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid data',
    });
  }
};
const getIdTour = async (req, res) => {
  try {
    const data = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'succes',
      body: data,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'succes',
      message: err,
    });
  }
};
const patchId = async (req, res) => {
  try {
    const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'succes',
      body: data,
    });
  } catch (err) {
    res.status(200).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
};
const deleteId = async (req, res) => {
  try {
    const data = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'succes',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
};

const stats = async (req, res) => {
  try {
    const data = await Tour.aggregate([
      {
        $match: { duration: { $gt: 3, $lt: 9 } },
      },
      { $group: { "_id": 4.7,"maxPrice":  , "averagePrice": { $avg: '$price' } } },
    ]);
    res.status(200).json({
      status: 'SUCCESS',
      body: data,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  rewiewgetAll,
  postTour,
  getIdTour,
  patchId,
  deleteId,
  stats,
};
