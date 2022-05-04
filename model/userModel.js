const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'ismingizni kiritishingiz shart!'],
  },
  email: {
    type: String,
    required: [true, 'emailingizni kiritishingiz shart!'],
  },
  role: {
    type: String,
    required: [true, 'rolingizni kiritishingiz shart!'],
  },
  active: {
    type: Boolean,
    required: [true, 'activlikni berishingiz shart!'],
  },
  photo: {},
});
