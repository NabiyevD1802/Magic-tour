const Tour = require('../model/tourModel');

const rewiewgetAll = async (req, res) => {
  try {
    const data = await Tour.find();
    res.status(200).json({
      status: 'succes',
      results: data.length,
      data: data,
    });
  } catch {
    res.status(200).json({
      status: 'fail',
      message: 'invalid data',
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
  } catch (err) {
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

module.exports = { rewiewgetAll, postTour, getIdTour, patchId, deleteId };
