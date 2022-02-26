

export default function handler(req, res) {
    if(req.method === "GET") {
        res.status(200).json({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PK,
        });
    } else {
        res.status(405).end("Method not allowed");
    }
}