import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://adrien-admin:adrien-admin@asbury-books.hlqwi.mongodb.net/AsburyBooks?retryWrites=true&w=majority";


const connectDB = async () => {
    const client = await MongoClient.connect(URI);
    return client;
}

export const getAllBooks = async () => {
    const client = await connectDB();

    const db = client.db();

    const response = await db.collection("books").find();
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
    
    return books;
}