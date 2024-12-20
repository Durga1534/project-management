const express = require('express');
const { addProject, getProjects, editProject, deleteProject, assignUserToProject, getProjectById } = require('../controllers/projectController');
const router = express.Router();

router.post('/add', addProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id',  editProject);
router.delete('/:id', deleteProject);
router.post('/assign', assignUserToProject);

module.exports = router;
