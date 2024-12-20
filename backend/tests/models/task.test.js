const mongoose = require('mongoose');
const Task = require('../../models/Task');
const Project = require('../../models/Project');
const User = require('../../models/User');

describe('Task Model', () => {
    let projectId; 
    let userId;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/testdb' , { useNewUrlParser: true, useUnifiedTopology: true });
        
        const project = new Project({ title: 'Test Project', description: 'Test project description', status: 'active' }); 
        await project.save(); 
        projectId = project._id; 
        
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password123' }); 
        await user.save(); 
        userId = user._id;
    });
    it('should create a team', async () => {
        const task = new Task({
            title: 'Test Team',
            description: 'Description of a test team',
            status: 'active',
            projectId: projectId,
            dueDate: new Date(),
            assignedTo: userId,
        });
        await task.save();
        expect(task.isNew).toBe(false);
        expect(task.projectId).toEqual(projectId);
        expect(task.assignedTo).toEqual(userId);
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    })
})