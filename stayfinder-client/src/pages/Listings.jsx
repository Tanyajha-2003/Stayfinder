// src/pages/Listings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listings.css';
import { Link } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, startOfDay, endOfDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

const Listings = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [listings, setListings] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('https://stayfinder-backend-2qaa.onrender.com/api/listings');
        setListings(response.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const location = listing.location || '';
    const matchLocation = location.toLowerCase().includes(searchLocation.toLowerCase());

    const matchMinPrice = !minPrice || listing.price >= parseFloat(minPrice);
    const matchMaxPrice = !maxPrice || listing.price <= parseFloat(maxPrice);

    const availableFrom = listing.available_from ? startOfDay(new Date(listing.available_from)) : null;
    const availableTo = listing.available_to ? endOfDay(new Date(listing.available_to)) : null;

    const selectedStart = startOfDay(dateRange[0].startDate);
    const selectedEnd = endOfDay(dateRange[0].endDate);

    const isDateFilterActive = selectedStart.toDateString() !== selectedEnd.toDateString();

    let matchDateRange = true;
  
    if (isDateFilterActive && availableFrom && availableTo) {
      matchDateRange = selectedStart >= availableFrom && selectedEnd <= availableTo;
    }  

    return matchLocation && matchMinPrice && matchMaxPrice && matchDateRange;
  });

  return (
    <div className="listings-container">
      <h2 className="listings-heading">Available Listings</h2>
      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <div className="date-picker-wrapper">
          <input
            type="text"
            readOnly
            className="calendar-input"
            value={`${format(dateRange[0].startDate, 'MMM d, yyyy')} - ${format(dateRange[0].endDate, 'MMM d, yyyy')}`}
            onClick={() => setShowCalendar(!showCalendar)}
          />
          {showCalendar && (
            <div className="calendar-popup">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                locale={enUS}
              />
            </div>
          )}
        </div>
      </form>

      {/* Listings */}
      {filteredListings.length === 0 ? (
        <p className="no-listings">No listings match your filters</p>
      ) : (
        <div className="listings-grid">
          {filteredListings.map((listing) => (
            <Link to={`/listing/${listing.id}`} className="listing-card-link" key={listing.id}>
              <div className="listing-card">
                <img src={listing.imageUrl} alt={listing.title} className="listing-image" />
                <div className="listing-info">
                  <h3>{listing.title}</h3>
                  <p className="listing-description">{listing.description}</p>
                  <p className="listing-price">₹{listing.price} per night</p>
                  <p className="listing-location">{listing.location}</p>
                  <button className="listing-button">View Details</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
