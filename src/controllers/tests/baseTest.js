import request from 'supertest';

import app from '../..';
import models from '../../database/models';

const truncateTables = async () => {
  await models.Sms.destroy({ force: true, truncate: { cascade: true } });
  await models.Users.destroy({ force: true, truncate: { cascade: true } });
};
it('should return the right string from the API', (done) => {
  request(app)
    .get('/api/v1/')
    .expect(200)
    .end((err, res) => {
      expect(res.body).toHaveProperty('statusMessage');
      expect(res.body.statusMessage).toEqual('This is the SMS API');
      done();
    });
});
const baseTest = {
  app,
  request,
  truncateTables,
};
export default baseTest;
