import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
        if(req.query.subscriptionID) {
            const deleted = await stripe.subscriptions.del(req.query.subscriptionID);
            res.status(200).json({ status: 'ok', deleted});
        } else {
            throw new Error('No Valid Subscription ID Found');
        }
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  } else {
    res.setHeader("Allow", "DELETE");
    res.status(405).end("Method not allowed");
  }
}
