import mongoose from "mongoose";
import { setupBookmarks } from "./bookmarks.js";

export async function connect() {
  return await mongoose.connect(
    `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURL}`
  );
}

export async function setupDb() {
  const mongo = await connect();
  await setupBookmarks(mongo);
  mongo.connection.close();
}

export async function collectionNames(mongo) {
  const collections = await mongo.connection.db.listCollections().toArray();
  const names = collections.map((collection) => collection.name);
  return names;
}
