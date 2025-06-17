import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListingDetail.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your-publishable-key');
const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [coords, setCoords] = useState([40.7128, -74.0060]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/listings/${id}`);
        const data = response.data;
        setListing(data);
        console.log("Full Address:", data.full_address);

        if (data.full_address) {
          const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              q: data.full_address,
              format: 'json',
            },
          });

          if (geoRes.data && geoRes.data.length > 0) {
            const { lat, lon } = geoRes.data[0];
            const latLng = [parseFloat(lat), parseFloat(lon)];
            console.log("Setting coordinates to:", latLng);
            setCoords(latLng);
            setCoords([parseFloat(lat), parseFloat(lon)]);
          }
          else {
            console.warn("No geocoding result for address:", data.full_address);
          }
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to confirm your booking.');
      window.location.href = '/login';
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates');
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date');
      return;
    }

    setBookingConfirmed(true);
    navigate('/payment', {
      state: {
        amount: listing.price,
        checkInDate,
        checkOutDate,
      },
    });
  };

  if (!listing) return <p className="loading-text">Loading listing details...</p>;

  return (
    <div className="listing-detail-container">
      <img src={listing.imageUrl} alt={listing.title} className="listing-detail-image" />

      <div className="listing-detail-info">
        <h2>{listing.title}</h2>
        <div className="info-card">
          <p className="location">📍 {listing.location}</p>
          {listing.full_address && (
            <p className="full-address">📌 Address: {listing.full_address}</p>
          )}
          <p className="description">{listing.description}</p>
          <p className="price">💰 ₹{listing.price} / night</p>
        </div>


        {listing.available_from && listing.available_to && (
          <p className="availability">
            🗓️ Available from <strong>{new Date(listing.available_from).toLocaleDateString()}</strong> to{' '}
            <strong>{new Date(listing.available_to).toLocaleDateString()}</strong>
          </p>
        )}

        {/* Placeholder for Map Component (optional) */}
        {coords && coords[0] !== 40.7128 ? (
          <div className="map-container">
            <MapContainer center={coords} zoom={13} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              <Marker position={coords}>
                <Popup>{listing.full_address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <p className="map-placeholder">📍 Map is loading or unavailable.</p>
        )}

        <form onSubmit={handleBooking} className="booking-form">
          <label>Select Check-in Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />

          <label>Select Check-out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />

          <button type="submit" className="book-now-button">Confirm Booking</button>
        </form>
        {bookingConfirmed && (
          <div className="payment-section">
            <h3>💳 Complete Your Payment</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={listing.price} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;
