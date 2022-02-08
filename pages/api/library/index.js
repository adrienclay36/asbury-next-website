import { getAllBooks } from "../../../mongo-util"

const handler = async (req, res) => {
    if(req.method === 'GET') {
        const pageNumber = parseInt(req.query.page || "0");
        const response = await getAllBooks(pageNumber);
        // const response = await getAllBooks();

        res.status(200).json({ books: response.books, totalPages: response.totalPages })
    }
}

export default handler;