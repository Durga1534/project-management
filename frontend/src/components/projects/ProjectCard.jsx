import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/projects/${project._id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      className="card bg-base-100 shadow-xl p-4 cursor-pointer transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleViewDetails}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{project.title}</h2>
          <div className="flex space-x-2">
            <button
              className="btn btn-outline flex items-center"
              onClick={(e) => { e.stopPropagation(); onEdit(project._id); }}
            >
              <FaEdit className="w-3 h-3 mr-1" /> Edit
            </button>
            <button
              className="btn btn-danger flex items-center"
              onClick={(e) => { e.stopPropagation(); onDelete(project._id); }}
            >
              <FaTrash className="w-3 h-3 mr-1" /> Delete
            </button>
          </div>
        </div>
        <p>{project.description}</p>
        <p><strong>Start Date:</strong> {formatDate(project.startDate)}</p>
        <p><strong>Due Date:</strong> {formatDate(project.dueDate)}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-accent" onClick={handleViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    startDate: PropTypes.string,
    dueDate: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectCard;
