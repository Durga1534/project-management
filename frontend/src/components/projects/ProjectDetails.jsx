import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
        setProjectDetails(response.data);
      } catch (error) {
        setError('Error fetching project details');
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString();
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {projectDetails ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h1 className="text-3xl font-bold mb-4">{projectDetails.title}</h1>
          <p className="mb-4">{projectDetails.description}</p>
          <p className="mb-4"><strong>Due Date:</strong> {formatDate(projectDetails.dueDate)}</p>
          {projectDetails.assignedUsers && projectDetails.assignedUsers.length > 0 && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Assigned Users</h2>
              <ul>
                {projectDetails.assignedUsers.map((user) => (
                  <li key={user._id} className="mb-2">
                    <strong>{user.username}</strong> - {user.role}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="btn btn-accent text-white px-4 py-2 rounded ml-2"
            onClick={() => navigate('/projects')}
          >
           Close
          </button>
        </div>
      ) : (
        <p className="text-center">No project details found.</p>
      )}
    </div>
  );
};

export default ProjectDetails;
