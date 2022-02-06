import { getAllBlogPosts } from "../../../firebase-util"

const handler = async (req, res) => {
    if(req.method === 'GET') {
        const {posts, totalPages} = await getAllBlogPosts();
        res.status(200).json({posts, totalPages});

    }

}

export default handler;