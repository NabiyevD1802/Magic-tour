const User = require('../model/userModel');

const getusers = async (req, res) => {
  try {
    const data = await User.find();
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
const postUser = async (req, res) => {
  try {
    const data = await User.create(req.body);
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
const getuser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
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
const patchUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
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
const deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
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

module.exports = { getusers, postUser, getuser, patchUser, deleteUser };
