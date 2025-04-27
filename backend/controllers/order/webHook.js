const stripe = require("../../config/stripe");
const orderModel = require("../../models/orderModel")
const asyncWrapper = require("../../middleware/asyncWrapper");

const endPointKey = process.env.STRIPE_ENDPOINT_WEBHOOK_KEY;

async function getLineItems(lineItems) {
  let ProductItems = []

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.image,
      }

      ProductItems.push(productData);
    }
  }

  return ProductItems;
}

const webHook = asyncWrapper(async (req, res) => {
  const sig = req.headers['stripe-signature'];

  const payloadString = JSON.stringify(req.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endPointKey,
  });

  // ... existing code ...
  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, sig, endPointKey);
    console.log("Received Event:", event); // Log the entire event object
  } catch (err) {
    console.error("Webhook Error:", err.message); // Log any errors during event construction
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      console.log("Session Data:", session); // Log session data

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_options: session.shipping_options,
        totalAmount: session.amount_total / 100,
      }

      console.log("Order Details:", orderDetails); // Log order details

      const order = new orderModel(orderDetails);
      try {
        const saveOrder = await order.save();
        console.log("Save Order Result:", saveOrder); // Log save result
      } catch (error) {
        console.error("Error saving order:", error); // Log any errors during save
      }

      break;

    default:
      console.log("Unhandled event type:", event.type);
  }
  // ... existing code ...

  res.status(200).json({ success: true, event });
})

module.exports = webHook;