import { deletePost, getPostById, updatePostById } from '../../../mongo-util-blog';


const handler = async (req, res) => {
  if (req.method === "GET") {
    const response = await getPostById(req.query.postID);
    res.status(200).json(response);
  }

  if (req.method === "DELETE") {
    const response = await deletePost(req.query.postID);
    if (response.status === "ok") {
      res.status(200).json({ response });
      return;
    } else {
      res.status(500).json({ response });
      return;
    }
  }

  if (req.method === "POST") {
    const response = await updatePostById(req.query.postID, req.body);
    if (response.status === "ok") {
      res.status(200).json(response);
      return;
    } else {
      res.status(200).json({ response });
      return;
    }
  }

};

export default handler;
