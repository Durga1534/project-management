import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useStore } from '../../store/store';

const Navbar = () => {
  const loggedInUser = useStore((state) => state.loggedInUser);
  const logoutUser = useStore((state) => state.logoutUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/projects">Projects</Link></li>
          </ul>
        </div>
        <Link to="/" className="text-xl font-bold">PMS</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        {/* Inline links for large screens */}
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/projects">Projects</Link></li>
        </ul>
      </div>

      <div className="navbar-end">
        {loggedInUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <FaUser className="text-2xl" />
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="font-semibold text-center">{loggedInUser.username}</li>
              <li>
                <button onClick={handleLogout}>
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signup" className="btn btn-outline">Sign Up</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
