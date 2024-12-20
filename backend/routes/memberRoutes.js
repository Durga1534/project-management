const express = require('express');
const {getMembers, addMemberToProject} = require('../controllers/memberController');
const router = express.Router();

router.get('/', getMembers);
router.post('/add', addMemberToProject);

module.exports = router;