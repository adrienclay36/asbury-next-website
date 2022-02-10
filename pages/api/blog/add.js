import { addPost } from "../../../mongo-util-blog";
import { auth } from '../../../firebase-config';
import { getAuth } from "firebase/auth";

const handler = async (req, res) => {
  if (req.method === "POST") {
    
    const newPost = {
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      content: req.body.content,
      date: new Date()
    }
    const response = await addPost(newPost);
    res.status(200).json(response);
  }
};

export default handler;
