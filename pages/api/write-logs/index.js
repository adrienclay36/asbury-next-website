import { supabase } from "../../../supabase-client";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { message, type, user } = req.body;
        const { data, error } = await supabase.from('logs').insert({
            message,
            type,
            user,
        });
        res.status(200).json({ status: "ok" });
    } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
