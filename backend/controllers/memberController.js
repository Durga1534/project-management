const User = require('../models/User');
const Project = require('../models/Project');

const getMembers = async(req, res) => {
    try {
        const members = await User.find();
        res.status(200).json(members);
    }catch(err) {
        res.status(500).json({message: 'Server error'});
    }
};

const addMemberToProject = async(req, res) => {
    const {userId, ProjectId} = req.body;
    try {
        const project = await Project.findById(ProjectId);
        project.members.push(userId);
        await project.save();
        res.status(200).json({message: 'Member added to project', project});
    }catch(err) {
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {getMembers, addMemberToProject};