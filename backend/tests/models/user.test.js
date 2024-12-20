const mongoose = require('mongoose');
const User = require('../../models/User');
describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  it('should create a user', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await user.save();
    expect(user.isNew).toBe(false);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});
