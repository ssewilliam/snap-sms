import request from 'supertest';

import app from '../..';

describe('API routes', () => {
  it('should return the right string', (done) => {
    request(app)
      .get('/api/v1/')
      .expect(200).end((err, res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('This is the SMS API');
        if (err) return done(err);
        done();
      });
  });
});
