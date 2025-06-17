// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Find Your Perfect Stay</h1>
        <p>Browse listings, book your favorite space, and enjoy your next trip.</p>
        <Link to="/listings" className="home-button">Explore Listings</Link>
      </div>
    </div>
  );
};

export default Home;
