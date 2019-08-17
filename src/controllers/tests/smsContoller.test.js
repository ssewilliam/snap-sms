import baseTest from './baseTest';

const {
  request, app, truncateTables, users, registerUser,
} = baseTest;

describe('smsController', () => {
  let userResult;
  beforeAll(async () => {
    await truncateTables();
    userResult = await registerUser(users.user1);
  });
  it('should allow auser to send an sms', (done) => {
    request(app)
      .post('/api/v1/sms')
      .set('Content-Type', 'application/json')
      .send({
        senderId: userResult.body.result.id,
        receiverId: 1,
        messageBody: 'this is a sample message from the body',
      })
      .end((err, res) => {
        expect(res.status).toBe(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toBe('sms saved successfully');
        expect(res.body.result.isRead).toBe(false);
        done();
      });
  });
  it('should allow auser to send messages to only valid recievers', (done) => {
    request(app)
      .post('/api/v1/sms')
      .set('Content-Type', 'application/json')
      .send({
        senderId: userResult.body.result.id,
        receiverId: 'one',
        messageBody: 'this is a sample message from the body',
      })
      .end((err, res) => {
        expect(res.status).toBe(422);
        expect(res.body.errors[0].msg).toEqual('receiver id must be a number');
        done();
      });
  });
});