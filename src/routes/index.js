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
Router.get(
  '/user/:phoneNumber',
  Validator.validateParamPhoneNumber,
  userController.getContact,
);
Router.get(
  '/users',
  userController.getContacts,
);
Router.put(
  '/user/:phoneNumber',
  Validator.validateParamPhoneNumber,
  Validator.validateUser,
  userController.updateContact,
);
Router.post('/sms', Validator.validateRequest, smsController.createMessage);
Router.delete(
  '/user',
  Validator.validatePhoneNumber,
  userController.delete,
);

export default Router;
