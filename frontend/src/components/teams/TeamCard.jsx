import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye, FaUsers } from 'react-icons/fa';

const TeamCard = ({ team, onEdit, onDelete, onOpenModal, onViewTeam }) => {
  return (
    <motion.div
      className="card bg-base-100 shadow-xl p-4 cursor-pointer transition-transform duration-300"
      onClick={onOpenModal}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title flex items-center">
            <FaUsers className="w-5 h-5 mr-2" /> {team.name}
          </h2>
        </div>
        <p>{team.members.length} Members</p>
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-outline flex items-center mr-2"
            onClick={(e) => { e.stopPropagation(); onViewTeam(team._id); }}
          >
            <FaEye className="w-5 h-5 mr-1" /> View Team
          </button>
          <button
            className="btn btn-outline flex items-center mr-2"
            onClick={(e) => { e.stopPropagation(); onEdit(team._id); }}
          >
            <FaEdit className="w-5 h-5 mr-1" /> Edit
          </button>
          <button
            className="btn btn-danger flex items-center"
            onClick={(e) => { e.stopPropagation(); onDelete(team._id); }}
          >
            <FaTrash className="w-5 h-5 mr-1" /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

TeamCard.propTypes = {
  team: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onViewTeam: PropTypes.func.isRequired,
};

export default TeamCard;
