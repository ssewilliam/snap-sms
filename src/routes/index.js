import express from 'express';
import { check, validationResult, alreadyHaveEmail } from 'express-validator';
import contollers from '../controllers';
import middleware from '../middleware';

const { userController, smsController } = contollers;
const { Validator } = middleware;
const Router = express.Router();

Router.get('/', userController.welcome);
Router.post('/user', userController.register);
Router.post('/sms', Validator.validateRequest, smsController.createMessage);
Router.delete('/user', Validator.validateEmail, userController.delete);

export default Router;
