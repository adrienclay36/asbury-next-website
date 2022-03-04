import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
        
      const prices = await stripe.prices.list();
      const activePrices = prices.data.filter(price => price.active === true && price.unit_amount > 0);
      const sortedPrices = activePrices.sort((a, b) => {
        return a.unit_amount - b.unit_amount;
      })
      let pricesOnly = [];
      for (let price of sortedPrices) {
        const fixedPrice = price.unit_amount / 100
        pricesOnly.push(fixedPrice.toString());
      }
      res.status(200).json({prices: sortedPrices, costList: pricesOnly});
    } catch (err) {
        console.log(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
