

const handler = (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body);
        res.status(200).json({status: "ok"});
    }
}

export default handler;