const mongoose = require('mongoose');
const Team = require('../../models/Team');

describe('Team Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
    });
    it('should create a team', async() => {
        const team = new Team ({
            name: 'Name of a test team',
            members: [],
        });
        await team.save();
        expect(team.isNew).toBe(false);
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });
});