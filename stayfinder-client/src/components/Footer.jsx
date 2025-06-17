import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3 className="logo">StayFinder</h3>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/listings">Browse Listings</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StayFinder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
