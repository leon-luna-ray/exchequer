import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URI || "";

const client = new MongoClient(connectionString, { useUnifiedTopology: true });

let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch (e) {
  console.error("Error connecting to MongoDB:", e);
}

const db = conn.db("budget-tracker");

export default db;