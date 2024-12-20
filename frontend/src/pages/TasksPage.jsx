import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskCard from '../components/tasks/TaskCard';
import AddTask from '../components/tasks/AddTask';
import { useStore } from '../store/store';

const TasksPage = () => {
  const navigate = useNavigate();
  const tasks = useStore((state) => state.tasks);
  const setTasks = useStore((state) => state.setTasks);
  const loadingTasks = useStore((state) => state.loadingTasks);
  const setLoadingTasks = useStore((state) => state.setLoadingTasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tasks');
        setTasks(response.data);
        setLoadingTasks(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [setTasks, setLoadingTasks]);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleEditTask = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskToDelete}`);
      setTasks(tasks.filter(task => task._id !== taskToDelete));
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const cancelDeleteTask = () => {
    setIsDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Tasks</h1>
      <button
        className="btn btn-outline px-4 py-2 rounded mb-6"
        onClick={handleOpenModal}
      >
        Add Task
      </button>
      {loadingTasks ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={() => handleTaskClick(task._id)}
              onEdit={() => handleEditTask(task._id)}
              onDelete={() => handleDeleteTask(task._id)}
            />
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <AddTask onTaskAdded={handleTaskAdded} />
            <button
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmDeleteTask}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={cancelDeleteTask}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
