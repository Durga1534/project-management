const mongoose = require('mongoose');
const Project = require('../../models/Project'); 

describe('Project Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  it('should create a project', async () => {
    const project = new Project({
      title: 'Test Project',
      description: 'Description of test project',
      status: 'active',
      startDate: new Date(),
      dueDate: new Date(Date.now() + 7*24*60*60*1000), 
      assignedUsers: []
    });

    await project.save();
    expect(project.isNew).toBe(false);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});
