const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//get loggedin users
const getLoggedInUsers = async(req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.status(200).json(user);
    }catch(err) {
        res.status(500).json({message: 'Server error'});
    }
};

//assign roles to the users
const assignUserRole = async(req, res) => {
    try{
        const {userId, role} = req.body;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        user.role = role;
        await user.save();
        res.status(200).json(user);
    }catch(err) {
        res.status(500).json({message: 'Server error'});
    }
}

//get user wit roles

const getUsersWithDetails  = async(Req, res) => {
    try {
        const users = await User.find()
        .populate('tasks')
        .populate('projects')
        .populate('teams');
        res.status(200).json(users);
    }catch(err) {
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = { getUsers, getLoggedInUsers, assignUserRole, getUsersWithDetails};
