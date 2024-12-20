const Task = require('../models/Task');
const User = require('../models/User');

const addTask = async (req, res) => {
    const { title, description, status, projectId, dueDate } = req.body;
    try {
        const newTask = new Task({ title, description, status, projectId, dueDate });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTasksChartData = async (req, res) => {
    try {
        const completedTasks = await Task.aggregate([
            { $match: { status: 'Completed' } },
            {
                $group: {
                    _id: { $month: "$completedDate" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const labels = completedTasks.map(task => monthNames[task._id - 1]);
        const completedData = completedTasks.map(task => task.count);

        res.status(200).json({ labels, completedData });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const assignTaskToUser = async(req, res) => {
    const {taskId, userId} = req.body;
    try {
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json({message: 'Task not found'});
        }
        task.assignedTo = userId;
        await task.save();

        const user = await User.findById(userId);
        user.tasks.push(taskId);
        await user.save();
        
        const updatedTask = await Task.findById(taskId).populate('assignedTo');
        res.status(200).json({message: 'Task assigned successfully', task: updatedTask});
    }catch(err) {
        res.status(500).json({message: 'Server error', err});
    }
}

const getTaskById = async(req, res) => {
    const {taskId} = req.params;
    try{
        const task = await Task.findById(taskId).populate('assignedTo');
        if(!task) {
            return res.status(400).json({message: 'Task not found'});
        }
        res.status(200).json(task);
    }catch(err) {
        console.error('Error fetching task details : ', err.message);
        res.status(500).json({message: 'Server error', error: err.message})
    }
}

const updateTask = async(req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {new : true});
        if(!updatedTask) {
           return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json(updatedTask);
    }catch(err) {
        res.status(500).json({message: 'Server error'});
    }
}

const deleteTask = async(req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({message: 'Task deleted successfully'});
    }catch(err) {
        res.status(500).json({message: 'Server error', err})
    }
}
module.exports = { addTask, getTasks, getTasksChartData, assignTaskToUser, getTaskById, updateTask, deleteTask};
