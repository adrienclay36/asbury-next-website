import { getQuerydata } from "../../../mongo-util-blog";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const query = req.query.searchTerm;
    const response = await getQuerydata(query);
    let status;
    if (response.posts.length === 0) {
      status = "No Data";
    } else {
      status = "ok";
    }
    res.status(200).json({ posts: response.posts, status: status });
  }
};

export default handler;
