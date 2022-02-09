import { addBook } from "../../../mongo-util";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const response = await addBook(req.body);
        res.status(200).json(response);
    }
}

export default handler;