const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const { Booking } = require('../models');

// Create a booking (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { userId } = req.user; 
    const { listingId, startDate, endDate, totalPrice } = req.body;

    // Create booking
    const newBooking = await Booking.create({
      userId, 
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    return res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating booking' });
  }
});

module.exports = router;
