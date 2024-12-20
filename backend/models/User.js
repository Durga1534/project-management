const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    enum: ['admin', 'manager', 'user'], 
    default: 'user'
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  teams: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team'
  }],

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
