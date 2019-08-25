import request from 'supertest';

import app from '../..';
import models from '../../database/models';
import users from '../mocks/user';

const truncateTables = async () => {
  await models.Sms.destroy({ force: true, truncate: true, cascade: true });
  await models.Users.destroy({
    force: true,
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
  await models.Sent.destroy({ force: true, truncate: true, cascade: true });
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

const registerUser = async (userObject) => {
  const res = await request(app)
    .post('/api/v1/user')
    .set('Content-Type', 'application/json')
    .send({ ...userObject });
  return res;
};
const deleteUser = async (phoneNumber) => {
  const res = await request(app)
    .delete('/api/v1/user')
    .set('Content-Type', 'application/json')
    .send({ phoneNumber });
  return res;
};

const baseTest = {
  app,
  request,
  truncateTables,
  registerUser,
  deleteUser,
  users,
};
export default baseTest;
