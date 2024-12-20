import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const getRowColor = (index) => {
    const colors = ['bg-red-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-purple-100', 'bg-orange-100'];
    return colors[index % colors.length];
  };

  const handleAssignRole = async () => {
    try {
      await axios.put('http://localhost:8080/api/users/assign-role', {
        userId: selectedUser,
        role: selectedRole,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser ? { ...user, role: selectedRole } : user
        )
      );
      setSelectedUser(null);
      setSelectedRole('');
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-base-100 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchInput}
          onChange={handleSearch}
          className="input input-bordered w-full"
        />
      </div>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className={getRowColor(index)}>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => setSelectedUser(user._id)}
                    className="btn btn-accent px-4 py-2 rounded mb-2"
                  >
                    Assign Role
                  </button>
                  {selectedUser === user._id && (
                    <div className="flex flex-col">
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="input input-bordered mb-2"
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </select>
                      <button
                        onClick={handleAssignRole}
                        className="btn btn-success text-white px-4 py-2 rounded"
                      >
                        Save Role
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
