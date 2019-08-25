import models from '../database/models';
import ResponseController from './responseController';

class smsController {
  static async createMessage(req, res) {
    const {
      userId, receiverId, messageBody,
    } = req.body;
    const senderExists = await models.Users.findOne({
      where: {
        id: userId,
      },
    });
    if (!senderExists) {
      const message = [400, 'Sender does not exist', false];
      return ResponseController.response(res, message, null);
    }
    const result = await models.Sms.create({
      senderId: userId,
      receiverId,
      messageBody,
      isRead: false,
    });

    const message = [201, 'sms saved successfully', true];
    return ResponseController.response(res, message, result);
  }

  static async getMessage(req, res) {
    const { receiverId } = req.params;
    const smsExists = await models.Sms.findOne({
      include: [
        {
          model: models.Sent,
          as: 'sentMessages',
          attributes: {
            exclude: ['UserId', 'deletedAt', 'id'],
          },
          where: {
            userId: receiverId,
          },
        },
      ],
    });
    if (smsExists) {
      const message = [200, 'Message Found', true];
      return ResponseController.response(res, message, smsExists);
    }
    const message = [404, 'Message not Found', false];
    return ResponseController.response(res, message, smsExists);
  }
}

export default smsController;
