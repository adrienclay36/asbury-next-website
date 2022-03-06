import Stripe from "stripe";
import { supabase } from "../../supabase-client";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, userID } = req.body;

    try {
        console.log("Establishing New Customer");
      const customer = await stripe.customers.create({
        name: name,
        email: email,
      });
      await supabase.from('users').update({ customer_id: customer.id}).match({ id: userID });
      res.status(200).json({customerID: customer.id});
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
