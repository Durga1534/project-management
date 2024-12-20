import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTask = ({ onTaskAdded }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: '',
        projectId: '',
        dueDate: '',
    });
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/tasks/add', taskData);
            setMessage(response.data.message);
            onTaskAdded(response.data.task);
        } catch (error) {
            setMessage('Error adding task');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Add Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Task Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={taskData.status}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Project:</label>
                    <select
                        name="projectId"
                        value={taskData.projectId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">Add Task</button>
                {message && <p className="mt-4 text-green-500">{message}</p>}
            </form>
        </div>
    );
};

export default AddTask;
