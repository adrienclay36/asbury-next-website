import Stripe from "stripe";
import { supabase } from "../../supabase-client";
import { WEBSITE_URL } from "../../constants/home-url";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
        const { amount, customerID } = req.body;
        const session = await stripe.checkout.sessions.create({
            customer: customerID,
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "One Time Donation",
                },
                unit_amount: amount * 100,
                
              },

              description: "One Time Donation to Asbury UMC",
              quantity: 1,
              
            },
          ],

          mode: "payment",
          success_url: `${WEBSITE_URL}/giving/checkout-success`,
          cancel_url: `${WEBSITE_URL}/giving/checkout-cancel`,
          
        });


        res.status(200).json({ status: 'ok', sessionURL: session.url, });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
