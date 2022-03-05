import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { customerID } = req.body;

    try {
      const session = await stripe.billingPortal.sessions.create({
          customer: customerID,
          return_url: 'http://localhost:3000/'
      });
      res.status(200).json({sessionURL: session.url});
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
