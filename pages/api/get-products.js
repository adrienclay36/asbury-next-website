import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK);

const priceFilter = (vals) => {
  return vals.sort((a, b) => {
    const aPrice = a.name[0] === "$" ? parseFloat(a.name.slice(1, -1)) : 0;
    const bPrice = b.name[0] === "$" ? parseFloat(b.name.slice(1, -1)) : 0;
    return aPrice - bPrice;
  });
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
        
      const prices = await stripe.prices.list({ limit: 50})
      const products = await stripe.products.list({ active: true });
      const sortedProducts = priceFilter(products.data);

      let namesOnly = [];
      for (let product of sortedProducts) {
        namesOnly.push(product.name);
      }
      const activePrices = prices.data.filter(price => price.active === true);
      const sortedPrices = activePrices.sort((a, b) => {
        return a.unit_amount - b.unit_amount;
      })
      let pricesOnly = [];
      for (let price of sortedPrices) {
        const fixedPrice = price.unit_amount / 100
        pricesOnly.push(fixedPrice.toString());
      }
      res.status(200).json({prices: sortedPrices, costList: pricesOnly, products: products.data, namesOnly});
      
    } catch (err) {
        console.log(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
