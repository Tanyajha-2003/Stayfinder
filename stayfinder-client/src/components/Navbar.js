import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateClick = () => {
    if (token) {
      navigate('/create-listing');
    } else {
      alert('Please login to create a listing.');
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">StayFinder</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/listings">Listings</Link></li>
        
        {/* Protected create button */}
        <li>
          <button
            onClick={handleCreateClick}
            className="navbar-button-link"
          >
            Create
          </button>
        </li>

        {!token ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
