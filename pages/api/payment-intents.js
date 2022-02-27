import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);


export default async function handler(req, res) {
    if(req.method === "POST") {
        try{
            const { amount, email } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
                receipt_email: email,
            });
            res.status(200).send(paymentIntent.client_secret);
        } catch(err) {
            res.status(500).json({ statusCode: 500, message: err.message});
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method not allowed");
    }
}