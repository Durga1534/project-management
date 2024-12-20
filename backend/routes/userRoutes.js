const express = require('express');
const { getUsers, getLoggedInUsers, assignUserRole, getUsersWithDetails} = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.get('/loggedInUsers', getLoggedInUsers);
router.get('/', getUsersWithDetails);
router.put('/assign-role', assignUserRole);

module.exports = router;