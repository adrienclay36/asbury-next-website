import { getBlogPostByID } from "../../../firebase-util";


const handler = async (req, res) => {
    if(req.method === 'GET') {
        const postID = req.query.postID;
        const post = await getBlogPostByID(postID);
        res.status(200).json({post});
    }
}

export default handler;