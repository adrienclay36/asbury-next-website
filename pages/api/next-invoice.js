import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

const handler = async (req, res) => {
  if (req.method === "GET") {
    if(req.query.customerID){
      try{
        const invoice = await stripe.invoices.retrieveUpcoming({
          customer: req.query.customerID,
        })
        
        res.status(200).json({ invoice });
        res.status(200).end();
      } catch(err) {
        res.status(500).json({ status: 'error', error: err.message});
      }

    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
