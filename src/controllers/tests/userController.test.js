import baseTest from './baseTest';

const { request, app, truncateTables } = baseTest;

describe('API routes', () => {
  beforeAll(async () => {
    await truncateTables();
  });

  it('should return the user details after registration', (done) => {
    request(app)
      .post('/api/v1/user')
      .set('Content-Type', 'application/json')
      .send({
        email: 'ssewilliam@mail.com',
        firstName: 'sse',
        lastName: 'william',
        imageField: 'http://ugextra.com/images/me',
      })
      .end((err, res) => {
        expect(res.body.result.firstName).toBe('sse');
        expect(res.body.success).toBe(true);
        done();
      });
  });
});
