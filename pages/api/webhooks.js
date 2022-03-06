import Stripe from "stripe";
import { buffer } from "micro";
import { supabase } from "../../supabase-client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function webhookHandler(req, res) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET;

    let event;

    try {
      if (!sig || !webhookSecret) return;

      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      let customerID
      switch (event.type) {
        case "customer.subscription.deleted":
          console.log("Subscription Deleted");
          customerID = event.data.object.customer;
          await supabase.from('users').update( { recurring_donations: false }).match({customer_id: customerID});
          break;
        case "customer.subscription.updated":
          console.log("Updated");
          const canceled = event.data.object.cancel_at;
          customerID = event.data.object.customer;
          if (canceled) {
            await supabase
              .from("users")
              .update({ recurring_donations: false })
              .match({ customer_id: customerID });
          } else {
            await supabase
              .from("users")
              .update({ recurring_donations: true })
              .match({ customer_id: customerID });
          }
          break;
        case 'checkout.session.completed':
          console.log(event.data.object.customer, ": Completed checkout");
          break;
        default:
          console.log("Skipped");
          break;
      }
    } catch (error) {
      console.log("Webhook error: ", error.message);
      return res.status(400).send("Webhook error: ", error.message);
    }
    res.status(200).send();
  }
}
