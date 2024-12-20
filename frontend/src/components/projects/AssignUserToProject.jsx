import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignUserToProject = ({ projectId, onAssigned }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAssign = async () => {
    if (!selectedUser || !role) return;
    try {
      await axios.post(`http://localhost:8080/api/projects/${projectId}/assign`, {
        userId: selectedUser,
        role,
      });
      onAssigned();
    } catch (error) {
      console.error('Error assigning user:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assign User to Project</h2>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Select User</span>
        </label>
        <select
          className="select select-bordered"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Assign Role</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <button className="btn btn-accent" onClick={handleAssign}>
        Assign
      </button>
    </div>
  );
};

export default AssignUserToProject;
