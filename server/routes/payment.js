const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('your-secret-key');

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Payment initiation failed' });
  }
});

module.exports = router;
