import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from '../components/projects/ProjectCard';
import AddProjects from '../components/projects/AddProjects';
import { useStore } from '../store/store';

const ProjectsPage = () => {
  const projects = useStore((state) => state.projects);
  const setProjects = useStore((state) => state.setProjects);
  const loadingProjects = useStore((state) => state.loadingProjects);
  const setLoadingProjects = useStore((state) => state.setLoadingProjects);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/projects');
        setProjects(response.data);
        setLoadingProjects(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [setProjects, setLoadingProjects]);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleEditProject = (projectId) => {
    navigate(`/projects/edit/${projectId}`);
  };

  const handleDeleteProject = (projectId) => {
    setProjectToDelete(projectId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteProject = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${projectToDelete}`);
      setProjects(projects.filter(project => project._id !== projectToDelete));
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const cancelDeleteProject = () => {
    setIsDeleteConfirmOpen(false);
    setProjectToDelete(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProjectAdded = (newProject) => {
    setProjects([...projects, newProject]);
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>
      <button
        className="btn btn-outline px-4 py-2 rounded mb-6"
        onClick={handleOpenModal}
      >
        Add Project
      </button>
      {loadingProjects ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={() => handleEditProject(project._id)}
              onDelete={() => handleDeleteProject(project._id)}
            />
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <AddProjects onProjectAdded={handleProjectAdded} />
            <button
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
              onClick={handleCloseModal}
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
            <p>Are you sure you want to delete this project?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmDeleteProject}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={cancelDeleteProject}
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

export default ProjectsPage;
