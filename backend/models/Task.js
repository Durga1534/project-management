const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required:true},
    dueDate: {type: Date},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
   }, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;