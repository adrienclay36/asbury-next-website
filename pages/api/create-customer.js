import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);


const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { paymentMethodId } = req.body;

        try { 
            const customer = await stripe.customers.create({
                payment_method: paymentMethodId,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                }
            });

            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: req.body.price }],
                expand: ["latest_invoice.payment_intent"]
              });
              res.status(200).json(subscription);


        } catch(e) {
            console.log(`create-customer:: Error: ${e.message}`);
            res.status(500).json({ statusCode: 500, message: e.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end("Method Not Allowed");
    }
}

export default handler;