const mongoose = require('mongoose');
const fs = require('fs');
const env = require('dotenv');
env.config({ path: './config.env' });

const DB = process.env.DATABASE;

const Tour = require('./../../model/tourModel');

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const addInfo = async () => {
  try {
    const addData = await Tour.create(data);
    console.log("Ma'lumotni qo'shdim!");
  } catch (err) {
    console.log(err);
  }
};

const daleteDate = async () => {
  try {
    const daleteD = await Tour.deleteMany();
    console.log("Hamma ma'lumot o'chirildi!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--add') {
  addInfo();
} else if (process.argv[2] === '--remove') {
  daleteDate();
}
console.log(process.argv);
