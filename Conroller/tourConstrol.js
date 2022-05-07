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
        this.surov = this.surov.find(JSON.parse(queryStr));
        return this;
      }
      sort() {
        /* 2- SORT */
        if (this.surovUrl.sort) {
          const querySort = this.surovUrl.sort.split(',').join(' ');
          this.surov = this.surov.sort(querySort);
          return this;
        }
        return this;
      }
      field() {
        /* 3 - FIELD */

        if (this.surovUrl.field) {
          const queryField = this.surovUrl.field.split(',').join(' ');
          this.surov = this.surov.select(queryField);
        } else {
          this.surov = this.surov.select('-__v');
        }
        return this;
      }
      page() {
        /* 4 - PAGE */
        const page = this.surovUrl.page * 1 || 1;
        const limit = this.surovUrl.limit * 1 || 3;
        const skip = (page - 1) * limit;
        this.surov = this.surov.skip(skip).limit(limit);

        return this;
      }
    }

    let data = new APIFeatures(Tour, req.query).filter().sort().field();

    const queryData = await data.surov;
    if (this.surovUrl.page) {
      const numberOfDocuments = await this.surov.countDocuments();
      if (numberOfDocuments < skip) {
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

module.exports = { rewiewgetAll, postTour, getIdTour, patchId, deleteId };
