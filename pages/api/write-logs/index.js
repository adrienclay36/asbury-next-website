import { supabase } from "../../supabase-client";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { message, type } = req.body;
        console.log(message);
        console.log(type);
        const { data, error } = await supabase.from('logs').insert({
            message,
            type,
        });
        res.status(200).json({ status: "ok" });
    } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
