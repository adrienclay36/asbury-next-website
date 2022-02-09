import { deleteBook, getBookById, updateBookById, toggleAvailability } from "../../../mongo-util";
const handler = async (req, res) => {

    if (req.method === 'GET') {
        const response = await getBookById(req.query.bookID);
        res.status(200).json(response);

    }

    if (req.method === 'DELETE') {
        const response = await deleteBook(req.query.bookID);
        if(response.status === "ok"){
            res.status(200).json({response});
            return;
        } else {
            res.status(500).json({response});
            return;
        }
    }


    if (req.method === "POST") {
        const response = await updateBookById(req.query.bookID, req.body);
        if(response.status === "ok"){

            res.status(200).json(response);
            return;
        } else {
            res.status(200).json({response});
            return;
        }
    }

    if(req.method === "PATCH") {
        const id = req.query.bookID;
        try{
            const response = await toggleAvailability(id);
            res.status(200).json(response);
            return;

        } catch(err) {
            res.status(200).json(response);
        }
    }



}

export default handler