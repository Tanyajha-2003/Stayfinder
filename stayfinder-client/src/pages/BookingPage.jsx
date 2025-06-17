// src/pages/BookingPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };
    fetchListing();
  }, [id]);
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to confirm your booking.');
    window.location.href = '/login';  
    return;
  }
  const handleBooking = () => {
    setMessage('✅ Booking successful! (Simulated)');
  };

  if (!listing) {
    return <div className="booking-page">Loading listing...</div>;
  }

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2>{listing.title}</h2>
        <img src={listing.imageUrl} alt={listing.title} />
        <p><strong>Location:</strong> {listing.location}</p>
        <p><strong>Description:</strong> {listing.description}</p>
        <p><strong>Price:</strong> ${listing.price}</p>
        <button onClick={handleBooking}>Confirm Booking</button>
        {message && <p className="booking-message">{message}</p>}
      </div>
    </div>
  );
};

export default BookingPage;


