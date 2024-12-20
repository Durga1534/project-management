import React from 'react';
import { motion } from 'framer-motion';

const AnimateCard = ({ bgColor = 'bg-primary', title, description }) => {
  return (
    <motion.div
      className={`card ${bgColor} text-primary-content w-96 shadow-xl`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Click here</button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimateCard;