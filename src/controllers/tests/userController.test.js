import baseTest from './baseTest';

const {
  truncateTables, registerUser, users, deleteUser,
} = baseTest;

describe('API routes', () => {
  beforeAll(async () => {
    await truncateTables();
  });

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

  it('should delete a user', async () => {
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
