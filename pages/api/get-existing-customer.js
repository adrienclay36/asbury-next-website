import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

const handler = async (req, res) => {
  if (req.method === "POST") {
      console.log(req.body);
    const { customerID } = req.body;
    const { name, phone, email, paymentMethodId, price } = req.body.customerInfo;
    

    try {
      const customer = await stripe.customers.update(customerID, 
        {
            email: email,
            name: name,
            phone: phone,
        })

        const setupIntent = await stripe.setupIntents.create({
            payment_method: paymentMethodId,
            customer: customerID,
        })
        
        const confirmIntent = await stripe.setupIntents.confirm(setupIntent.id)
        console.log(confirmIntent);
      const subscription = await stripe.subscriptions.create({
        customer: customerID,
        default_payment_method: setupIntent.payment_method,
        items: [{ price: price }],
        expand: ["latest_invoice.payment_intent"],
      });
      res.status(200).json(subscription);
    } catch (e) {
      console.log(`create-customer:: Error: ${e.message}`);
      res.status(500).json({ statusCode: 500, message: e.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
