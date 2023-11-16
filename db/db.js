import mongoose from "mongoose";
import { setupBookmarks } from "./bookmarks.js";

export async function connect() {
  return await mongoose.connect(
    `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURL}`
  );
}

export async function setupDb() {
  const mongo = await connect();
  const collNames = await collectionNames(mongo);

  await setupBookmarks(mongo, collNames);

  mongo.connection.close();
}

async function collectionNames(mongo) {
  const collections = await mongo.connection.db.listCollections().toArray();
  const collNames = collections.map((collection) => collection.name);
  return collNames;
}
