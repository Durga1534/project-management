const Project = require('../models/Project');
const User = require('../models/User');

const addProject = async(req, res) => {
    const {title, description, status, startDate, endDate} = req.body;

    try {
        const newProject = new Project({title, description, status, startDate, endDate});
        await newProject.save();
        res.status(201).json({message: 'Project created successfully', project: newProject});
    }catch(err) {
        res.status(500).json({message: 'Server error'});
    }
};

const getProjects = async(req, res) => {
    try {
        const projects = await Project.find().populate('assignedUsers');
        res.status(200).json(projects);
    }catch(err) {
        res.status(500).json({message: 'Server error'})
    }
}

//edit the project
const editProject = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json(updatedProject);
    }catch(err) {
        res.status(500).json({message: 'Server error', err})
    }
}

//delete project

const deleteProject = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if(!deletedProject) {
            return res.status(404).json({message: 'Project not found'});
        }
        res.status(200).json({message: 'Project deleted Successfully'});
    }catch(err) {
        res.status(500).json({message: 'Server error', err});
    }
}

//assign user to a project
const assignUserToProject = async(req, res) => {
    try {
        const {projectId, userId, role} = req.body;
        const project = await Project.findById(projectId);
        project.members.push({user: userId, role});
        await project.save();
        res.status(200).json(project);
    }catch(err) {
        res.status(500).json({message: 'Server error', err});
    }
}

const getProjectById = async(req, res) => {
    try {
        const {id} = req.params;
        const project = await Project.findById(id).populate('assignedUsers');
        if(!project) {
            return res.status(404).json({message: 'Project not found'});
        }
        res.status(200).json(project);
    }catch(err) {
        res.status(500).json({message: 'Server error', err});
    }
}
module.exports = { addProject, getProjects, editProject, deleteProject, assignUserToProject, getProjectById};