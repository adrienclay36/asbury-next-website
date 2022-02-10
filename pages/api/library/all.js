import { getAllBooks } from "../../../mongo-util";


const handler = async (req, res) => {
  if (req.method === "GET") {


    const response = await getAllBooks();

    res
      .status(200)
      .json(response);
  }
};

export default handler;