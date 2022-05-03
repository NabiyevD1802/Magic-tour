const fs = require('fs');
const getusers = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: ' this message ishlamadi',
  });
};
const getuser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: ' this message ishlamadi',
  });
};
const postUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: ' this message ishlamadi',
  });
};

const patchUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: ' this message ishlamadi',
  });
};
const deleteUser = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: ' this message ishlamadi',
  });
};
module.exports = { getusers, getuser, postUser, patchUser, deleteUser };
