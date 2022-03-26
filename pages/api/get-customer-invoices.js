import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
        const { customerID } = req.query;
        const invoices = await stripe.invoices.list({ customer: customerID });
        const paymentIntents = await stripe.paymentIntents.list({
          customer: customerID,
          limit: 1000,
        })
        
        

      res.status(200).json({invoices: invoices.data, payments: paymentIntents.data});
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method not allowed");
  }
}
