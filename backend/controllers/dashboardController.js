const Team = require('../models/Team');
const Project = require('../models/Project');
const Task = require('../models/Task');

const getDashboardData = async (req, res) => {
    try {
        const teamsCount = await Team.countDocuments();
        const projectsCount = await Project.countDocuments();
        const pendingTasksCount = await Task.countDocuments({ status: 'Pending' });
        const completedTasksCount = await Task.countDocuments({ status: 'Completed' });

        const data = {
            teamsCount ,
            projects: projectsCount,
            pendingTasks: pendingTasksCount,
            completedTasks: completedTasksCount,
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getDashboardData };
