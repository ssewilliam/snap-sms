import models from '../database/models';
import ResponseController from './responseController';

class User {
  static welcome(req, res) {
    res.status(200).json({
      statusMessage: 'This is the SMS API',
    });
  }

  static async getUser(email) {
    const user = await models.Users.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  static async register(req, res) {
    const {
      email, firstName, lastName, imageField,
    } = req.body;
    const foundUser = await User.getUser(email);

    if (foundUser) {
      const message = [409, 'Contact already exists', false];
      return ResponseController.response(res, message, foundUser);
    }

    const result = await models.Users.create({
      email,
      firstName,
      lastName,
      image: imageField,
    });

    const message = [201, 'Contact saved successfully', true];
    return ResponseController.response(res, message, result);
  }

  static async delete(req, res) {
    const { email } = req.body;
    const foundUser = await User.getUser(email);

    if (foundUser) {
      const result = await foundUser.destroy();
      const message = [200, 'Contact deleted successfully', true];
      return ResponseController.response(res, message, result);
    }
    const message = [404, `User with email ${email} does not exist`, false];
    return ResponseController.response(res, message, null);
  }
}

export default User;
