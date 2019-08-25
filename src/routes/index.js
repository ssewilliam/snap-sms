import express from 'express';
import contollers from '../controllers';
import middleware from '../middleware';

const { userController, smsController } = contollers;
const { Validator } = middleware;
const Router = express.Router();

Router.get('/', userController.welcome);
Router.post('/user', Validator.validateUser, userController.register);
Router.post('/sms', Validator.validateRequest, smsController.createMessage);
Router.delete('/user', Validator.validatePhoneNumber, userController.delete);

export default Router;
