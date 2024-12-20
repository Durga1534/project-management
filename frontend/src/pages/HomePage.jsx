import React from 'react';
import Header from '../components/layouts/Header';
import Navbar from '../components/layouts/Navbar';
import UsersPage from './UsersPage';

const Homepage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Navbar />
      <div className="container mx-auto mt-4">
        <p className="text-center mt-2 text-gray-700">
          Get started by exploring the dashboard, managing tasks, or creating teams!
        </p>
      </div>
      <UsersPage />
    </div>
  );
};

export default Homepage;