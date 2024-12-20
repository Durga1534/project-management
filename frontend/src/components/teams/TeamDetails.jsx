import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AssignTeam from './AssignTeam';
import { FaUserCircle } from 'react-icons/fa';

const TeamDetails = () => {
  const { teamId } = useParams();
  const [teamDetails, setTeamDetails] = useState({
    name: '',
    description: '',
    members: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [isSelectMemberOpen, setIsSelectMemberOpen] = useState(false);

  const fetchTeamDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const [teamRes, usersRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/teams/${teamId}`),
        axios.get('http://localhost:8080/api/users'),
      ]);
      setTeamDetails(teamRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      setError('Error fetching team details');
      console.error('Error fetching team details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamDetails();
  }, [teamId]);

  const handleOpenSelectMember = () => {
    setIsSelectMemberOpen(true);
  };

  const handleCloseSelectMember = () => {
    setIsSelectMemberOpen(false);
  };

  const handleAssign = async (userId) => {
    try {
      await axios.post('http://localhost:8080/api/teams/assignTo', { teamId, userId });
      fetchTeamDetails();
      setIsSelectMemberOpen(false);
    } catch (error) {
      console.error('Error assigning user to team:', error);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{teamDetails.name}</h1>
      <p className="mb-4 text-center">{teamDetails.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Array.isArray(teamDetails.members) && teamDetails.members.length > 0 ? (
          teamDetails.members.map((member, index) => (
            <div
              key={`${member._id}-${index}`}
              className="card bg-white shadow-xl p-4 flex items-center"
            >
              <FaUserCircle size={40} className="mr-4" />
              <div className="card-body">
                <h3 className="card-title">{member.username}</h3>
                <p>{member.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No members found.</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-2">Assign User to Team</h2>
      <button
        className="btn btn-accent mb-4"
        onClick={handleOpenSelectMember}
      >
        Assign Members
      </button>
      {isSelectMemberOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <AssignTeam users={users} teamId={teamId} onAssigned={(userId) => handleAssign(userId)} />
            <button
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
              onClick={handleCloseSelectMember}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
