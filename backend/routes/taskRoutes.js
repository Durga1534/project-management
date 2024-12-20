const express = require('express');
const { addTask, getTasks, getTasksChartData, assignTaskToUser, getTaskById, deleteTask, updateTask} = require('../controllers/taskController');
const router = express.Router();

router.post('/add', addTask);
router.get('/', getTasks);
router.get('/chart-data', getTasksChartData)
router.post('/assign', assignTaskToUser);
router.get('/:taskId', getTaskById);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;