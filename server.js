// const express = require('express');

const env = require('dotenv');

env.config({ path: './config.env' });
const app = require('./App.js');
const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {})
  .then((res) => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error');
  });

const PORT = process.env.PORT || 1600;
app.listen(PORT, process.env.URL);
