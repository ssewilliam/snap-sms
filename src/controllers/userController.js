import models from '../database/models';
import ResponseController from './responseController';

class User {
  static welcome(req, res) {
    res.status(200).json({
      statusMessage: 'This is the SMS API',
    });
  }

  static async register(req, res) {
    const {
      email, firstName, lastName, imageField,
    } = req.body;

    const result = await models.Users.create({
      email,
      firstName,
      lastName,
      image: imageField,
    });

    const message = [201, 'Role created successfully', true];
    ResponseController.response(res, message, result);
  }
}

export default User;
