const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// 🔧 MIDDLEWARE 
app.use(cors());
app.use(express.json());

// 🔗 ROUTES
const authRoutes = require('./routes/auth');
const listingsRoutes = require('./routes/listings');
const bookingsRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/bookings', bookingsRoutes);

// ✅ TEST ROUTE
app.get('/', (req, res) => {
  res.send('StayFinder API is running');
  
});

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
