const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    startDate: {type: Date},
    dueDate: {type: Date},
    assignedUsers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User'} ]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;