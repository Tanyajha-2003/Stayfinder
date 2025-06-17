const express = require('express');
const { Listing } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// ✅ Create a listing (with full_address and availability dates)
router.post('/', auth, async (req, res) => {
  try {
    console.log('➡️ Incoming listing data:', req.body);
    console.log('🧑‍💻 Authenticated user:', req.user);

    const {
      title,
      location,
      full_address,        
      description,
      price,
      imageUrl,
      available_from,      
      available_to        
    } = req.body;

    const newListing = await Listing.create({
      title,
      location,
      full_address,
      description,
      price,
      imageUrl,
      available_from,
      available_to,
      userId: req.user.userId
    });

    res.status(201).json({ message: 'Listing created', listing: newListing });
  } catch (error) {
    console.error('❌ Error in /api/listings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Get all listings 
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving listings' });
  }
});

// ✅ Get a specific listing by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findByPk(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving listing' });
  }
});

// ✅ Update listing 
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl } = req.body;

  try {
    const listing = await Listing.findByPk(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.imageUrl = imageUrl;

    await listing.save();
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Error updating listing' });
  }
});

// ✅ Delete listing
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findByPk(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    await listing.destroy();
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting listing' });
  }
});

module.exports = router;
