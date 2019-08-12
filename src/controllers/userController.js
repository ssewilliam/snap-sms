class User {
  static welcome(req, res) {
    res.status(200).json({
      message: 'This is the SMS API',
    });
  }
}
export default User;
