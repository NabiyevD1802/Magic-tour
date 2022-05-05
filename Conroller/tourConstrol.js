const Tour = require('../model/tourModel');

const rewiewgetAll = async (req, res) => {
  try {
    class APIFeatures {
      constructor(surov, surovUrl) {
        this.surov = surov;
        this.surovUrl = surovUrl;
      }
      filter() {
        /* 1 - FILTER */
        const query = { ...this.surovUrl };
        const removeQuery = ['sort', 'page', 'limit', 'field'];
        removeQuery.forEach((val) => delete query[val]);

        const queryStr = JSON.stringify(query)
          .replace(/\bgt\b/g, '$gt')
          .replace(/\blt\b/g, '$lt')
          .replace(/\bgte\b/g, '$gte')
          .replace(/\blte\b/g, '$lte');
        this.surov.find(JSON.parse(queryStr));
        return this;
      }
      sort() {
        /* 2- SORT */
        if (this.surovUrl.sort) {
          const querySort = this.surovUrl.sort.split(',').join(' ');
          this.surov = this.surov.sort(querySort);
          return this;
        }
      }
    }

    let data = new APIFeatures(Tour, req.query).filter().sort();

    /* 3 - FIELD */

    // if (req.query.field) {
    //   const queryField = req.query.field.split(',').join(' ');
    //   data = data.select(queryField);
    // } else {
    //   data = data.select('-__v');
    // }

    /* 4 - PAGE */
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 3;
    // const skip = (page - 1) * limit;

    // data = data.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numberOfDocuments = await Tour.countDocuments();
    //   if (numberOfDocuments < skip) {
    //     throw new Error('This page does not exsist');
    //   }
    // }

    const queryData = await data.surov;

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

module.exports = { rewiewgetAll, postTour, getIdTour, patchId, deleteId };
