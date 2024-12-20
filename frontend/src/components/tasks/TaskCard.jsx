import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStatusColor } from '../common/StatusUtils';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task, onClick, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/tasks/${task._id}`);
  };

  return (
    <motion.div
      className="card bg-base-100 shadow-xl p-4 cursor-pointer transition-transform duration-300"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{task.title}</h2>
          <div className="flex space-x-2">
            <button
              className="btn btn-outline flex items-center"
              onClick={(e) => { e.stopPropagation(); onEdit(task._id); }}
            >
              <FaEdit className="w-3 h-3 mr-1" /> Edit
            </button>
            <button
              className="btn btn-danger flex items-center"
              onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
            >
              <FaTrash className="w-3 h-3 mr-1" /> Delete
            </button>
          </div>
        </div>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        <div className="card-actions justify-end">
          <span className={`badge ${getStatusColor(task.status)} text-white`}>{task.status}</span>
          <button className="btn btn-accent" onClick={handleViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
