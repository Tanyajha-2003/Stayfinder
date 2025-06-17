import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import BookingPage from './pages/BookingPage';
import Footer from './components/Footer'; 
import ProtectedRoute from './components/ProtectedRoute';
import PaymentPage from './pages/PaymentPage';
function App() {
  return (
    <div className="app-container">
    <Router>
    <div className="app-wrapper">
      <Navbar />
      <div className='main'>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking/:id" element={<BookingPage />} />
      </Routes> */}
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/listing/:id" element={<ListingDetails />} />
  <Route path="/listings" element={<Listings />} />

  {/* 🔒 Protected routes */}
  <Route
    path="/create-listing"
    element={
      <ProtectedRoute>
        <CreateListing />
      </ProtectedRoute>
    }
  />
  <Route
    path="/booking/:id"
    element={
      <ProtectedRoute>
        <BookingPage />
      </ProtectedRoute>
    }
  />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/payment" element={<PaymentPage />} />
</Routes>
      </div>
      <Footer/>
      </div>
    </Router>
    </div>
  );
}

export default App;
