import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState({ name: '', description: '', members: [] });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/teams/${id}`);
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchTeam();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam((prevTeam) => ({ ...prevTeam, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/teams/${id}`, team);
      navigate(`/teams/${id}`);
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Team</h1>
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
        className="textarea textarea-bordered mb-2"
      />
      <button type="submit" className="btn btn-accent gap">Save</button>
    </form>
  );
};

export default EditTeam;
