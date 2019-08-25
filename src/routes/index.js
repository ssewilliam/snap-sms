import express from 'express';
import contollers from '../controllers';
import middleware from '../middleware';

const { userController, smsController } = contollers;
const { Validator } = middleware;
const Router = express.Router();

Router.get('/', userController.welcome);
Router.post(
  '/user',
  Validator.validatePhoneNumber,
  Validator.validateUser,
  userController.register,
);
Router.delete('/user', Validator.validatePhoneNumber, userController.delete);
Router.get(
  '/user/:phoneNumber',
  Validator.validateParamPhoneNumber,
  userController.getContact,
);
Router.put(
  '/user/:phoneNumber',
  Validator.validateParamPhoneNumber,
  Validator.validateUser,
  userController.updateContact,
);
Router.get('/users', userController.getContacts);
Router.post('/sms', Validator.validateRequest, smsController.createMessage);
Router.get(
  '/sms/:receiverId',
  Validator.validateReceiver,
  smsController.getMessage,
);
export default Router;
