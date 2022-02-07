import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  getDoc,
  doc,
  limit,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth, storage } from "./firebase-config";

export const getAllBlogPosts = async () => {
  const blogPostRef = collection(db, "blog_posts");
  const q = await query(blogPostRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  let posts = [];

  snapshot.forEach((doc) => {
    const t = Timestamp.fromDate(doc.data().date.toDate());
    posts.push({
      ...doc.data(),
      date: t.toDate().toLocaleDateString("en-US"),
      id: doc.id,
    });
  });
  const totalPages = Math.ceil(posts.length / 6);

  return {posts, totalPages};
};

export const getBlogPostByID = async (id) => {
  const docRef = await doc(db, "blog_posts", id);
  const document = await getDoc(docRef);
  if (document.exists()) {
    const t = Timestamp.fromDate(document.data().date.toDate());
    const data = {
      ...document.data(),
      date: t.toDate().toLocaleDateString("en-US"),
    };
    return data;
  }
  
};

export const deleteBlogPost = async (id) => {
  const blogDoc = await doc(db, "blog_posts", id);
  const response = await deleteDoc(blogDoc);
}

export const updateBlogPost = async (id, title, author, image, content) => {
  console.log(id);
  const blogDoc = await doc(db, "blog_posts", id);
  const newFields = {title, author, image, content};
  await updateDoc(blogDoc, newFields);
  return true;
}