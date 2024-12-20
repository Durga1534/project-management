import React, { useState } from 'react';
import axios from 'axios';

const AddProjects = ({ onProjectAdded }) => {
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        status: '',
        startDate: '',
        dueDate: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/projects/add', projectData);
            setMessage(response.data.message);
            onProjectAdded(response.data.project);
        } catch (error) {
            setMessage('Error adding project');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Add Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Project Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={projectData.title} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description:</label>
                    <textarea 
                        name="description" 
                        value={projectData.description} 
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
                        value={projectData.status} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Start Date:</label>
                    <input 
                        type="date" 
                        name="startDate" 
                        value={projectData.startDate} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Due Date:</label>
                    <input 
                        type="date" 
                        name="endDate" 
                        value={projectData.endDate} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">Add Project</button>
                {message && <p className="mt-4 text-green-500">{message}</p>}
            </form>
        </div>
    );
};

export default AddProjects;
