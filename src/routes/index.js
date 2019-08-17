import express from 'express';
import contollers from '../controllers';
import middleware from '../middleware';

const { userController, smsController } = contollers;
const { Validator } = middleware;
const Router = express.Router();

Router.get('/', userController.welcome);
Router.post('/user', userController.register);
Router.post('/sms', Validator.validateRequest, smsController.createMessage);

export default Router;
