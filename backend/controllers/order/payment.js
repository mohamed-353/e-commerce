const stripe = require('../../config/stripe');
const asyncWrapper = require("../../middleware/asyncWrapper");
const userModel = require('../../models/userModel');

const payment = asyncWrapper(async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems.data)) {
    return res.status(400).json({ success: false, message: "Invalid cart data" });
  }

  const userId = req.user._id;

  const user = await userModel.findOne({ _id: userId });

  const params = {
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_options: [
      { shipping_rate: 'shr_1QveDcRubQGk062GyLaCDGYR' } // Corrected format
    ],
    customer_email: user.email,
    metadata: {
      userId
    },
    line_items: cartItems.data.map(item => ({
      price_data: {
        currency: 'aed',
        product_data: {
          name: item.productName,
          images: item.productImage, // Ensure this is an array of URLs
          metadata: {
            productId: item._id,
          },
        },
        unit_amount: item.sellingPrice * 100, // Stripe expects amount in cents
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
      quantity: cartItems.cartItems.find(c => c.productId === item._id)?.quantity // Get correct quantity
    })),
    success_url: 'http://localhost:3000/success', //`${process.env.FRONTEND_URL}/success`
    cancel_url: 'http://localhost:3000/cancel', //`${process.env.FRONTEND_URL}/cancel`
  };

  const paymentSession = await stripe.checkout.sessions.create(params);

  res.status(200).json({
    success: true,
    message: 'Payment session created',
    data: paymentSession,
  });
});

module.exports = payment;
