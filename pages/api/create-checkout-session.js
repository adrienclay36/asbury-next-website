import Stripe from "stripe";
import { supabase } from "../../supabase-client";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { priceID, userID } = req.body;

      const { data, error } = await supabase.from('users').select().match({ id: userID});
      const userInfo = data[0];
      if(userInfo.customer_id) {
        const session = await stripe.checkout.sessions.create({
          customer: userInfo.customer_id,
          success_url:
            "https://asbury-next-website.vercel.app/profile/new-subscription-success",
          cancel_url:
            "https://asbury-next-website.vercel.app/",
          line_items: [{ price: priceID, quantity: 1 }],
          mode: "subscription",
        });
        res.status(200).json({ sessionURL: session.url });
        return;
      } else {
        const customer = await stripe.customers.create({
          name: `${userInfo.first_name} ${userInfo.last_name}`,
          email: userInfo.email,
        })
        await supabase.from('users').update({ customer_id: customer.id }).match({id: userID});
        const session = await stripe.checkout.sessions.create({
          customer: customer.id,
          success_url:
            "https://asbury-next-website.vercel.app/profile/new-subscription-success",
          cancel_url:
            "https://asbury-next-website.vercel.app/",
          line_items: [{ price: priceID, quantity: 1 }],
          mode: "subscription",
        });
        console.log(session);
        res.status(200).json({ sessionURL: session.url });
        
      }
      
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
