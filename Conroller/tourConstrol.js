const Tour = require('../model/tourModel');

const rewiewgetAll = async (req, res) => {
  try {
    const query = { ...req.query };
    const removeQuery = ['sort', 'page', 'limit', 'field'];
    removeQuery.forEach((val) => delete query[val]);
    const queryStr = JSON.stringify(query)
      .replace(/\bgt\b/g, '$gt')
      .replace(/\blt\b/g, '$lt')
      .replace(/\bgte\b/g, '$gte')
      .replace(/\blte\b/g, '$lte');
    let data = Tour.find(JSON.parse(queryStr));
    if (req.query.sort) {
      const querySort = req.query.sort.split(',').join(' ');
      data = data.sort(querySort);
    }

    const queryData = await data;

    if (queryData.length) {
      res.status(200).json({
        status: 'succes',
        results: queryData.length,
        data: queryData,
      });
    } else {
      throw new Error('Error');
    }
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
