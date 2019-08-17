export default class ResponseController {
  static response(res, message, result) {
    return res.status(message[0]).json({
      success: message[2],
      message: message[1],
      result,
    });
  }
}
