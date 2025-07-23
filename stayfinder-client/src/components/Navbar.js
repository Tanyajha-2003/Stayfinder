
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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

      {/* Mobile toggle */}
      <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/listings" onClick={() => setMenuOpen(false)}>Listings</Link></li>
        <li>
          <button onClick={() => { setMenuOpen(false); handleCreateClick(); }}>
            Create
          </button>
        </li>
        {!token ? (
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
        ) : (
          <li><button onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
