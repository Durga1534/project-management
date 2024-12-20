import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', status: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/tasks/${id}`, task);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/tasks/${id}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="input input-bordered mb-4"
        />
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="textarea textarea-bordered mb-4"
        />
        <label className="block mb-2">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="input input-bordered mb-4"
        />
        <label className="block mb-2">Status</label>
        <input
          type="text"
          name="status"
          value={task.status}
          onChange={handleChange}
          className="input input-bordered mb-4"
        />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Success</h2>
            <p>Task updated successfully!</p>
            <button
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTask;
