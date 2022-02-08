import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://adrien-admin:adrien-admin@asbury-books.hlqwi.mongodb.net/AsburyBooks?retryWrites=true&w=majority";


export const connectDB = async () => {
    const client = await MongoClient.connect(URI);
    return client;
}

export const getAllBooks = async (pageNumber) => {
    const client = await connectDB();
    const PAGE_SIZE = 15;

    const db = client.db();
    const total = await db.collection("books").countDocuments();
    const response = await db.collection("books").find().limit(PAGE_SIZE).skip(PAGE_SIZE * pageNumber);
    const books = [];
    await response.forEach(doc => books.push({
        _id: doc._id.toString(),
        title: doc.title,
        authorCode: doc.authorCode,
        author: doc.author,
        subject: doc.subject,
        availability: doc.availability,
        deweyNumber: doc.deweyNumber,
    }))
    
    client.close();
    
    return {books: books, totalPages: Math.ceil(total / PAGE_SIZE)};
}


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
    return {books: books}


}
