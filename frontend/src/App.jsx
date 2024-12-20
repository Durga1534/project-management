import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'theme-change';
import Homepage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import TeamsPage from './pages/TeamsPage'
import AddTeam from './components/teams/AddTeam';
import TeamDetails from './components/teams/TeamDetails';
import EditTeam from './components/teams/EditTeam';
import TasksPage from './pages/TasksPage';
import AddTask from './components/tasks/AddTask'
import TaskDetails from './components/tasks/TaskDetails';
import EditTask from './components/tasks/EditTask';
import ProjectsPage from './pages/ProjectsPage'
import AddProjects from './components/projects/AddProjects';
import ProjectDetails from './components/projects/ProjectDetails';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import EditProject from './components/projects/EditProject';


function App() {
  return (
    <Router>
        <Routes>
         <Route path="/" element={<Homepage />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/teams" element={<TeamsPage />} />
         <Route path="/add-team" element={<AddTeam />} />
         <Route path="/teams/:teamId" element={<TeamDetails />} />
         <Route path="/teams/edit/:id" element={<EditTeam />} />
         <Route path="/tasks" element={<TasksPage />} />
         <Route path="/add-task" element={<AddTask />} />
         <Route path="/tasks/:taskId" element={<TaskDetails />} />
         <Route path="/tasks/edit/:id" element={<EditTask />} />
         <Route path="/projects" element={<ProjectsPage />} />
         <Route path="/add-project" element={<AddProjects />} />
         <Route path="/projects/:projectId" element={<ProjectDetails />} />
         <Route path="/projects/edit/:projectId" element={<EditProject />} />
         <Route path="/signup" element={<SignupPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/users" element={<UsersPage />} />
        </Routes>
    </Router>
  );
}

export default App;
