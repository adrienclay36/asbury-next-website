import { getPagedPosts } from "../../../mongo-util-blog";

const handler = async (req, res) => {
    if(req.method === 'GET') {
        const pageNumber = parseInt(req.query.page || "0");
        const response = await getPagedPosts(pageNumber);

        res.status(200).json({ posts: response.posts, totalPages: response.totalPages })
    }
}

export default handler;

