const express = require('express');
const { addTeam, getTeams, getTeamById, addUserToTeam, updateTeam, deleteTeam } = require('../controllers/teamController');
const router = express.Router();

router.post('/add', addTeam);
router.get('/', getTeams);
router.get('/:teamId', getTeamById);
router.post('/assignTo', addUserToTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam)

module.exports = router;
