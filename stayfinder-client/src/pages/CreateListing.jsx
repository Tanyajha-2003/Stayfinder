// src/pages/CreateListing.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './CreateListing.css';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    full_address: '',
    description: '',
    price: '',
    imageUrl: '',
    available_from: '',
    available_to: ''
  });

  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/listings', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('✅ Listing created successfully!');
      setFormData({
        title: '',
        location: '',
        full_address: '',
        description: '',
        price: '',
        imageUrl: '',
        available_from: '',
        available_to: ''
      });
    } catch (err) {
      console.error('❌ Error creating listing:', err);
      setMessage('❌ Error creating listing. Please try again.');
    }
  };

  return (
    <div className="create-listing-page">
      <h2>Create a New Listing</h2>
      <form className="listing-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location (e.g., City, State)" value={formData.location} onChange={handleChange} required />
        <input type="text" name="full_address" placeholder="Full Address" value={formData.full_address} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price (per night)" value={formData.price} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
        <label>Available From:</label>
        <input type="date" name="available_from" value={formData.available_from} onChange={handleChange} required />
        <label>Available To:</label>
        <input type="date" name="available_to" value={formData.available_to} onChange={handleChange} required />

        <button type="submit">Submit Listing</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default CreateListing;
