const express = require('express');
const useCont = require('../Conroller/usercontrol.js');
// const app = express();
const userRouter = express.Router();
userRouter.route('/').get(useCont.getusers).post(useCont.postUser);
userRouter
  .route('/:id')
  .get(useCont.getuser)
  .patch(useCont.patchUser)
  .delete(useCont.deleteUser);

module.exports = userRouter;
