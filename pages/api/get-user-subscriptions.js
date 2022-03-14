import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);
import { supabase } from "../../supabase-client";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const subscription = await stripe.subscriptions.list({customer: req.body.customerID});

      let subscribed = subscription.data.length > 0;
      
      res.status(200).json({ subscribed });
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
