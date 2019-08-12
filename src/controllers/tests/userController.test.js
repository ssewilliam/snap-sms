import request from 'supertest';

import app from '../..';
import models from '../../database/models';

describe('API routes', () => {
  beforeAll(async () => {
    await models.Users.destroy({ force: true, truncate: { cascade: true } });
  });
  it('should return the right string', (done) => {
    request(app)
      .get('/api/v1/')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('statusMessage');
        expect(res.body.statusMessage).toEqual('This is the SMS API');
        if (err) return done(err);
        done();
      });
  });

  it('should return the right strings', (done) => {
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
