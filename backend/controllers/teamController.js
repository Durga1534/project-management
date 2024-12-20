const Task = require('../models/Task');
const Team = require('../models/Team');
const User = require('../models/User');

const addTeam = async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        await newTeam.save();
        res.status(201).json({ message: 'Team created successfully', team: newTeam });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members');
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTeamById = async (req, res) => {
    const { teamId } = req.params;
    try {
        const team = await Team.findById(teamId).populate('members')
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (err) {
        console.error('Error fetching team details :' , err.message)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const addUserToTeam = async (req, res) => {
    const { teamId, userId } = req.body;
    try {
        const team = await Team.findById(teamId);
        const user = await User.findById(userId);

        if(!team) {
            return res.status(404).json({message: 'Team not found'})
        }
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if(!team.members) {
            team.members = [];
        }
        if(!user.teams) {
            user.teams = [];
        }

        team.members.push(userId);
        user.teams.push(teamId);

        await team.save();
        await user.save();

        res.status(200).json({message: 'User assigned to team successfully'});
    }catch(err) {
        console.error('Error assigning user to team : ', err);
        res.status(500).json({message: 'Server error '});
    }
};

const updateTeam = async(req, res) => {
    try {
        const teamId = req.params.id;
        const updatedTeam = await Team.findByIdAndUpdate(teamId, req.body, {new : true});
        if(!updatedTeam) {
            return res.status(404).json({message: 'Team not found'});
        }
        res.status(200).json(updatedTeam);
    }catch(err) {
        res.status(500).json({message: 'Server error', err});
    }
}

const deleteTeam = async(req, res) => {
    try {
        const teamId = req.params.id;
       const deletedTeam =  await Team.findByIdAndDelete(teamId);
       if(!deletedTeam) {
         return res.status(404).json({message: 'Team not found'})
       }
        res.status(200).json({message: 'Team deleted successfully'});
    }catch(err) {
        res.status(500).json({message: 'Server error', err})
    }
}

module.exports = { addTeam, getTeams, getTeamById, addUserToTeam, updateTeam, deleteTeam};
