import models from '../database/models';

class User {
  static welcome(req, res) {
    res.status(200).json({
      statusMessage: 'This is the SMS API',
    });
  }

  static response(res, message, result) {
    return res.status(message[0]).json({
      success: message[2],
      message: message[1],
      result,
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
    User.response(res, message, result);
  }
}

export default User;
