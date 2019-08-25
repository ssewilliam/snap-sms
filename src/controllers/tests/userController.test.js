import baseTest from './baseTest';
import models from '../../database/models';

const {
  truncateTables,
  registerUser,
  getUser,
  getUsers,
  updateUser,
  users,
  deleteUser,
} = baseTest;

describe('userController', () => {
  beforeAll(async () => {
    await truncateTables();
  });

  describe('registerContact', () => {
    it('should register and return the user details', async () => {
      const res = await registerUser(users.user1);

      expect(res.body.result.firstName).toBe(users.user1.firstName);
      expect(res.body.success).toBe(true);
      expect(res.statusCode).toEqual(201);
    });

    it('should not allow user to register twice', async () => {
      const res = await registerUser(users.user1);

      expect(res.body.result.firstName).toBe(users.user1.firstName);
      expect(res.body.success).toBe(false);
      expect(res.statusCode).toEqual(409);
      expect(res.body.message).toEqual('Contact already exists');
    });

    it('should not allow user to register without phone numbers', async () => {
      const user = {
        ...users.user1,
        phoneNumber: undefined,
      };
      const res = await registerUser(user);

      expect(res.body.errors[0].param).toBe('phoneNumber');
      expect(res.body.errors[0].msg).toBe('phoneNumber has not been defined');
      expect(res.statusCode).toEqual(422);
    });
  });

  describe('getContact', () => {
    it('Should handle getting a known user', async () => {
      const res = await getUser(users.user1.phoneNumber);
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Contact exists');
    });
    it('Should handle getting an unknown user', async () => {
      const res = await getUser(1);
      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('User with number 1 does not exist');
    });
    it('Should handle when passed phoneNumber is invalid',
      async () => {
        const res = await getUser(null);
        expect(res.statusCode).toEqual(422);
        expect(res.body.errors[0].msg).toEqual(
          'Number entered is not a valid phoneNumber',
        );
      });
  });
  describe('getContacts', () => {
    it('Should handle when some one is registred', async () => {
      const res = await getUsers();
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Contacts found');
      expect(res.body.result.length).toEqual(1);
      expect(res.body.result[0].firstName).toEqual(users.user1.firstName);
    });
    it('Should handle when no one exists', async () => {
      await deleteUser(users.user1.phoneNumber);
      const res = await getUsers();
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('No contacts exist for now');
    });
  });
  describe('updateContact', () => {
    it('Should handle updating a known user', async () => {
      const userData = {
        ...users.user2,
        imageField: 'https://github.com/path',
      };

      await registerUser(users.user1);
      const user = await updateUser(users.user1.phoneNumber, userData);
      expect(user.statusCode).toEqual(200);
      expect(user.body.success).toEqual(true);
      expect(user.body.message).toEqual('Contact updated successfully');
      expect(user.body.result.image).toEqual('https://github.com/path');
    });
    it('Should handle getting an unknown user', async () => {
      const newData = {
        firstName: 'firstName',
        lastName: 'lastName',
        imageField: 'http://someUrl.path',
      };
      const res = await updateUser(1, newData);
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Contact does not exist');
    });
    it('Should handle until there is no invalid data', async () => {
      const res = await updateUser(users.user1.phoneNumber, null);
      expect(res.statusCode).toEqual(422);
      expect(res.body.errors[1].msg).toEqual(
        'firstName entered is not a valid string',
      );
      expect(res.body.errors[2].msg).toEqual('lastName has not been defined');
      expect(res.body.errors[3].msg).toEqual(
        'lastName entered is not a valid string',
      );
      expect(res.body.errors[4].msg).toEqual(
        'imageField url has not been defined',
      );
    });
    it('Should handle with invalid phoneNumber', async () => {
      const res = await updateUser(null, users.user1.phoneNumber);
      expect(res.statusCode).toEqual(422);
      expect(res.body.errors[0].msg).toEqual(
        'Number entered is not a valid phoneNumber',
      );
    });
  });
  describe('deleteContact', () => {
    beforeAll(() => {

    });
    it('should delete a user', async () => {
      await registerUser(users.user1);
      const res = await deleteUser(users.user1.phoneNumber);

      expect(res.body).toHaveProperty('success');
      expect(res.body.message).toBe('Contact deleted successfully');
      expect(res.statusCode).toEqual(200);
    });

    it('should not delete a user who does not exist', async () => {
      const res = await deleteUser('0774555577');

      expect(res.body.success).toBe(false);
      expect(res.body.result).toBe(null);
      expect(res.statusCode).toEqual(404);
    });

    it('should not delete a user with invalid phoneNumber', async () => {
      const res = await deleteUser('o773BB88ss');
      expect(res.statusCode).toEqual(422);
      expect(res.body.errors[0].msg).toBe(
        'Number entered is not a valid phoneNumber',
      );
    });
  });
});
