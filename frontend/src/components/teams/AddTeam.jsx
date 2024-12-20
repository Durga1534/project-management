import React, { useState } from 'react';
import axios from 'axios';

const AddTeam = ({ onTeamAdded }) => {
  const [team, setTeam] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam((prevTeam) => ({ ...prevTeam, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/teams/add', team);
      onTeamAdded(response.data);
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Add Team</h1>
      <label className="block mb-2">Name</label>
      <input
        type="text"
        name="name"
        value={team.name}
        onChange={handleChange}
        className="input input-bordered mb-4"
      />
      <label className="block mb-2">Description</label>
      <textarea
        name="description"
        value={team.description}
        onChange={handleChange}
        className="textarea textarea-bordered mb-4"
      />
      <button type="submit" className="btn btn-primary">Add Team</button>
    </form>
  );
};

export default AddTeam;
