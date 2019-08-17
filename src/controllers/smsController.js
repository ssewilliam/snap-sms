import models from '../database/models';
import ResponseController from './responseController';

class smsController {
  static async createMessage(req, res) {
    const {
      senderId, receiverId, messageBody,
    } = req.body;

    const result = await models.Sms.create({
      senderId,
      receiverId,
      messageBody,
      isRead: false,
    });

    const message = [201, 'sms saved successfully', true];
    ResponseController.response(res, message, result);
  }
}

export default smsController;
