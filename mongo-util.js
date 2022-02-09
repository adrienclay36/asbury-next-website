import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
const URI = process.env.NEXT_PUBLIC_MONGO_DB_URI;

export const connectDB = async () => {
  const client = await MongoClient.connect(URI);
  return client;
};

export const getAllBooks = async (pageNumber) => {
  const client = await connectDB();
  const PAGE_SIZE = 15;

  const db = client.db();
  const total = await db.collection("books").countDocuments();
  const response = await db
    .collection("books")
    .find()
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * pageNumber);
  const books = [];
  await response.forEach((doc) =>
    books.push({
      _id: doc._id.toString(),
      title: doc.title,
      authorCode: doc.authorCode,
      author: doc.author,
      subject: doc.subject,
      availability: doc.availability,
      deweyNumber: doc.deweyNumber,
    })
  );

  client.close();

  return { books: books, totalPages: Math.ceil(total / PAGE_SIZE) };
};

export const getQuerydata = async (query) => {
  const client = await connectDB();
  const db = client.db();
  const agg = [
    {
      $search: {
        index: "book-search",
        text: {
          query: query,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ];
  const booksColl = db.collection("books");

  let cursor = await booksColl.aggregate(agg).limit(100);

  const books = [];
  await cursor.forEach((doc) =>
    books.push({
      _id: doc._id.toString(),
      title: doc.title,
      authorCode: doc.authorCode,
      author: doc.author,
      subject: doc.subject,
      availability: doc.availability,
      deweyNumber: doc.deweyNumber,
    })
  );

  client.close();
  return { books: books };
};

export const addBook = async (bookData) => {
  const client = await connectDB();
  const db = client.db();
  try {
    await db.collection("books").insertOne(bookData);
    client.close();
    return { status: "ok" };
  } catch (err) {
    client.close();
    return { status: "ok", error: err.message };
  }
};

export const deleteBook = async (id) => {
  const client = await connectDB();
  const db = client.db();
  try {
    await db.collection("books").deleteOne({ _id: ObjectId(id) });
    client.close();
    return { status: "ok" };
  } catch (err) {
    console.log(err.message);
    client.close();
    return { error: err.message, status: "error" };
  }
};

export const getBookById = async (id) => {
  const client = await connectDB();
  const db = client.db();

  try {
    const book = await db.collection("books").findOne({ _id: ObjectId(id) });
    client.close();
    return { status: "ok", book: book };
  } catch (err) {
    client.close();
    return { status: "error", message: err.message };
  }
};

export const updateBookById = async (id, bookData) => {
  const client = await connectDB();
  const db = client.db();
  try {
    await db.collection("books").updateOne({ _id: ObjectId(id) }, { $set: bookData } );
    client.close();
    return { status: "ok", message: "Updated Book" };
  } catch (err) {
    client.close();
    return { status: "error", message: err.message };
  }
};

export const toggleAvailability = async (id) => {
  const client = await connectDB();
  const db = client.db();

  try {
    await db.collection("books").findOneAndUpdate({_id: ObjectId(id)},[{$set:{availability:{$eq:[false,"$availability"]}}}]);
    client.close();
    return { status: "ok", message: "Toggled Availability"};
  } catch(err) {
    client.close();
    return { status: "err", message: err.message};
  }
}
