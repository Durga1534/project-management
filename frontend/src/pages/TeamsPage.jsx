import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddTeam from '../components/teams/AddTeam';
import TeamCard from '../components/teams/TeamCard';
import AssignTeam from '../components/teams/AssignTeam';
import { useStore } from '../store/store';

const TeamsPage = () => {
  const navigate = useNavigate();
  const teams = useStore((state) => state.teams);
  const setTeams = useStore((state) => state.setTeams);
  const loadingTeams = useStore((state) => state.loadingTeams);
  const setLoadingTeams = useStore((state) => state.setLoadingTeams);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/teams');
        const uniqueTeams = response.data.filter((team, index, self) =>
          index === self.findIndex((t) => t._id === team._id)
        );
        setTeams(uniqueTeams);
        setLoadingTeams(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoadingTeams(false);
      }
    };

    fetchTeams();
  }, [setTeams, setLoadingTeams]);

  const fetchLoggedInUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/loggedInUsers');
      setLoggedInUsers(response.data);
    } catch (error) {
      console.error('Error fetching logged-in users:', error);
    }
  };

  const handleDeleteTeam = (teamId) => {
    setTeamToDelete(teamId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteTeam = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/teams/${teamToDelete}`);
      setTeams(teams.filter(team => team._id !== teamToDelete));
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const cancelDeleteTeam = () => {
    setIsDeleteConfirmOpen(false);
    setTeamToDelete(null);
  };

  const handleOpenModal = (teamId) => {
    setSelectedTeam(teams.find(team => team._id === teamId));
    fetchLoggedInUsers();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenAddTeamModal = () => {
    setIsAddTeamModalOpen(true);
  };

  const handleCloseAddTeamModal = () => {
    setIsAddTeamModalOpen(false);
  };

  const handleTeamAdded = (newTeam) => {
    setTeams([...teams, newTeam]);
    handleCloseAddTeamModal();
  };

  const handleAssign = async (userId) => {
    try {
      await axios.post('http://localhost:8080/api/teams/assignTo', { teamId: selectedTeam._id, userId });
      const updatedTeam = await axios.get(`http://localhost:8080/api/teams/${selectedTeam._id}`);
      setSelectedTeam(updatedTeam.data);
    } catch (error) {
      console.error('Error assigning user to team:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Teams</h1>
      <button
        className="btn btn-outline px-4 py-2 rounded mb-6"
        onClick={handleOpenAddTeamModal}
      >
        Add Team
      </button>
      {loadingTeams ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard
              key={team._id}
              team={team}
              onEdit={(teamId) => navigate(`/teams/edit/${teamId}`)}
              onDelete={() => handleDeleteTeam(team._id)}
              onOpenModal={() => handleOpenModal(team._id)}
              onViewTeam={(teamId) => navigate(`/teams/${teamId}`)}
            />
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Assign Members to {selectedTeam?.name}</h2>
            <AssignTeam users={loggedInUsers} teamId={selectedTeam?._id} onAssigned={(userId) => handleAssign(userId)} />
            <button
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isAddTeamModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <AddTeam onTeamAdded={handleTeamAdded} />
            <button
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
              onClick={handleCloseAddTeamModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this team?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmDeleteTeam}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={cancelDeleteTeam}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
