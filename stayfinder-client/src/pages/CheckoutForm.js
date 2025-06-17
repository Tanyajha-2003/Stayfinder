import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axios.post('http://localhost:5001/api/create-payment-intent', { amount })
      .then(res => setClientSecret(res.data.clientSecret))
      .catch(console.error);
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      alert('Payment failed: ' + result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      alert('✅ Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay ₹{amount}</button>
    </form>
  );
};

export default CheckoutForm;
