import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AssignTeam = ({ users, teamId, onAssigned }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const handleAssign = () => {
    if (selectedUser) {
      onAssigned(selectedUser);
      setSelectedUser('');
    }
  };

  return (
    <div>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="select select-bordered w-full mb-4"
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.username}</option>
        ))}
      </select>
      <button className="btn btn-accent w-full" onClick={handleAssign}>Assign User</button>
    </div>
  );
};

AssignTeam.propTypes = {
  users: PropTypes.array.isRequired,
  teamId: PropTypes.string.isRequired,
  onAssigned: PropTypes.func.isRequired,
};

export default AssignTeam;
