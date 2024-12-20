import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({ name: '', description: '', dueDate: '', assignedUsers: [] });
  const [users, setUsers] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (projectId) {
      const fetchProjectAndUsers = async () => {
        try {
          const [projectRes, usersRes] = await Promise.all([
            axios.get(`http://localhost:8080/api/projects/${projectId}`),
            axios.get('http://localhost:8080/api/users')
          ]);
          setProject({
            name: projectRes.data.name || '',
            description: projectRes.data.description || '',
            dueDate: projectRes.data.dueDate ? projectRes.data.dueDate.split('T')[0] : '',
            assignedUsers: projectRes.data.assignedUsers || []
          });
          setUsers(usersRes.data);
        } catch (error) {
          console.error('Error fetching project or users:', error);
        }
      };

      fetchProjectAndUsers();
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleAssignUser = (userId) => {
    setProject((prevProject) => ({
      ...prevProject,
      assignedUsers: prevProject.assignedUsers.includes(userId)
        ? prevProject.assignedUsers.filter((id) => id !== userId)
        : [...prevProject.assignedUsers, userId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/projects/${projectId}`, project);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/projects/${projectId}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Edit Project</h1>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          className="input input-bordered mb-4"
        />
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          className="textarea textarea-bordered mb-4"
        />
        <label className="block mb-2">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={project.dueDate}
          onChange={handleChange}
          className="input input-bordered mb-4"
        />
        <label className="block mb-2">Assign Users</label>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={project.assignedUsers.includes(user._id)}
                onChange={() => handleAssignUser(user._id)}
                className="mr-2"
              />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Success</h2>
            <p>Project updated successfully!</p>
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

export default EditProject;
