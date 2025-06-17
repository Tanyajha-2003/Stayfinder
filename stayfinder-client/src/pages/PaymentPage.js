// src/pages/PaymentPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../pages/CheckoutForm';
import './PaymentPage.css';

const stripePromise = loadStripe('your_stripe_public_key_here');

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount;

  if (!amount) {
    alert('Invalid access to payment page.');
    navigate('/');
    return null;
  }

  return (
    <div className="payment-page">
      <h2>💳 Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
