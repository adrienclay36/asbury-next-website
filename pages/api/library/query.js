import { getQuerydata } from "../../../mongo-util";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const query = req.query.searchTerm;
    const response = await getQuerydata(query);
    let status;
    if(response.books.length === 0) {
        status = "No Data";
    } else {
      status = "ok";
    }
    res
      .status(200)
      .json({ books: response.books, status: status});
  }
};

export default handler;
