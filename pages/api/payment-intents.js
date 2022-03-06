import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount, email, customerID } = req.body;
      let paymentIntent;
      if (customerID) {
        paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          customer: customerID,
          description: "One Time Donation"
        });
      } else {
        paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          receipt_email: email,
          description: "One Time Donation"
        });
      }

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      console.log("One time error:: Error: ", err.message);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
