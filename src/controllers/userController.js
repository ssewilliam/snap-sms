import models from '../database/models';
import ResponseController from './responseController';

class User {
  static welcome(req, res) {
    res.status(200).json({
      statusMessage: 'This is the SMS API',
    });
  }

  static async getUser(phoneNumber) {
    const user = await models.Users.findOne({
      where: {
        phoneNumber,
      },
    });
    return user;
  }

  static async register(req, res) {
    const {
      phoneNumber, firstName, lastName, imageField,
    } = req.body;
    const foundUser = await User.getUser(phoneNumber);

    if (foundUser) {
      const message = [409, 'Contact already exists', false];
      return ResponseController.response(res, message, foundUser);
    }

    const result = await models.Users.create({
      phoneNumber,
      firstName,
      lastName,
      image: imageField,
    });

    const message = [201, 'Contact saved successfully', true];
    return ResponseController.response(res, message, result);
  }

  static async delete(req, res) {
    const { phoneNumber } = req.body;
    const foundUser = await User.getUser(phoneNumber);

    if (foundUser) {
      const result = await foundUser.destroy();
      const message = [200, 'Contact deleted successfully', true];
      return ResponseController.response(res, message, result);
    }
    const message = [
      404,
      `User with number ${phoneNumber} does not exist`,
      false,
    ];
    return ResponseController.response(res, message, null);
  }

  static async getContact(req, res) {
    const { phoneNumber } = req.params;
    const foundUser = await User.getUser(phoneNumber);
    if (foundUser) {
      const message = [200, 'Contact exists', true];
      return ResponseController.response(res, message, foundUser);
    }
    const message = [
      404,
      `User with number ${phoneNumber} does not exist`,
      false,
    ];
    return ResponseController.response(res, message, null);
  }

  static async getContacts(req, res) {
    const foundUser = await models.Users.findAll();

    if (foundUser.length > 0) {
      const message = [200, 'Contacts found', true];
      return ResponseController.response(res, message, foundUser);
    }
    const message = [
      200,
      'No contacts exist for now',
      true,
    ];
    return ResponseController.response(res, message, foundUser);
  }

  static async updateContact(req, res) {
    const {
      firstName, lastName, imageField,
    } = req.body;
    const { phoneNumber } = req.params;

    const foundUser = await User.getUser(phoneNumber);
    if (foundUser) {
      const result = await foundUser.update({
        phoneNumber,
        firstName,
        lastName,
        image: imageField,
      });

      const message = [200, 'Contact updated successfully', true];
      return ResponseController.response(res, message, result);
    }
    const message = [400, 'Contact does not exist', false];
    return ResponseController.response(res, message, foundUser);
  }
}

export default User;
