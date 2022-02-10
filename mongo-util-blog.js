import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
const URI = process.env.NEXT_PUBLIC_MONGO_DB_URI;

export const connectDB = async () => {
  const client = await MongoClient.connect(URI);
  return client;
};


export const getAllPosts = async () => {
    const client = await connectDB();
    const db = client.db();

    const response = await db.collection("blog").find();
    const posts = [];
    await response.forEach((doc) =>
    posts.push({
      _id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      date: doc.date,
      image: doc.image,
      content: doc.content,
    }));

    client.close();

    return { posts: posts }

}


export const getPagedPosts = async (pageNumber) => {
  const client = await connectDB();
  const PAGE_SIZE = 6;

  const db = client.db();
  const total = await db.collection("blog").countDocuments();
  const response = await db
    .collection("blog")
    .find()
    .sort({ date: -1 })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * pageNumber);
  const posts = [];
  await response.forEach((doc) =>
    posts.push({
      _id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      date: doc.date,
      image: doc.image,
      content: doc.content,
    })
  );

  client.close();

  return { posts: posts, totalPages: Math.ceil(total / PAGE_SIZE) };
};




export const getQuerydata = async (query) => {
  const client = await connectDB();
  const db = client.db();
  const agg = [
    {
      $search: {
        index: "blog-search",
        text: {
          query: query,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ];
  const postsColl = db.collection("blog");

  let cursor = await postsColl.aggregate(agg).limit(100);

  const posts = [];
  await cursor.forEach((doc) =>
    posts.push({
      _id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      date: doc.date,
      image: doc.image,
      content: doc.content,
    })
  );

  client.close();
  return { posts: posts };
};




export const addPost = async (postData) => {
  const client = await connectDB();
  const db = client.db();
  try {
    await db.collection("blog").insertOne(postData);
    client.close();
    return { status: "ok" };
  } catch (err) {
    client.close();
    return { status: "ok", error: err.message };
  }
};

export const deletePost = async (id) => {
  const client = await connectDB();
  const db = client.db();
  try {
    await db.collection("blog").deleteOne({ _id: ObjectId(id) });
    client.close();
    return { status: "ok" };
  } catch (err) {
    console.log(err.message);
    client.close();
    return { error: err.message, status: "error" };
  }
};

export const getPostById = async (id) => {
  const client = await connectDB();
  const db = client.db();

  try {
    const post = await db.collection("blog").findOne({ _id: ObjectId(id) });
    client.close();
    const formatDate = new Date(post.date).toLocaleDateString("en-US");
    const modifiedPost = {
      _id: post._id.toString(),
      title: post.title,
      author: post.author,
      date: formatDate,
      image: post.image,
      content: post.content,
    };
    return { status: "ok", post: modifiedPost };
  } catch (err) {
    client.close();
    return { status: "error", message: err.message };
  }
};

export const updatePostById = async (id, postData) => {
  const client = await connectDB();
  const db = client.db();
  try {
    await db
      .collection("blog")
      .updateOne({ _id: ObjectId(id) }, { $set: postData });
    client.close();
    return { status: "ok", message: "Updated Post" };
  } catch (err) {
    client.close();
    return { status: "error", message: err.message };
  }
};