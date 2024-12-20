import React, { useState } from 'react';
import axios from 'axios';

const AssignTask = ({ users, taskId, onAssigned }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const handleAssign = async () => {
    try {
      await axios.post('http://localhost:8080/api/tasks/assign', {
        taskId,
        userId: selectedUser,
      });
      onAssigned();
    } catch (error) {
      console.error('Error assigning user to task:', error);
    }
  };

  return (
    <div>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="select select-bordered mb-4"
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.username}</option>
        ))}
      </select>
      <button className="btn btn-accent" onClick={handleAssign}>Assign User</button>
    </div>
  );
};

export default AssignTask;
