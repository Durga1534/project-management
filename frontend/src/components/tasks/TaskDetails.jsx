import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AssignTask from './AssignTask';

const TaskDetails = () => {
  const { taskId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchTaskDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const [taskRes, usersRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/tasks/${taskId}`),
        axios.get('http://localhost:8080/api/users'),
      ]);
      setTaskDetails(taskRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      setError('Error fetching task details');
      console.error('Error fetching task details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);

  const handleAssign = () => {
    fetchTaskDetails();
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {taskDetails ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{taskDetails.title}</h1>
          <p className="mb-4">{taskDetails.description}</p>
          <p className="mb-4"><strong>Status:</strong> {taskDetails.status}</p>
          {taskDetails.assignedTo && (
            <p className="mb-4"><strong>Assigned To:</strong> {taskDetails.assignedTo.username}</p>
          )}
          <AssignTask users={users} taskId={taskId} onAssigned={handleAssign} />
        </>
      ) : (
        <p className="text-center">No task details found.</p>
      )}
    </div>
  );
};

export default TaskDetails;
