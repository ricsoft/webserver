import { collectionNames } from "./db.js";

export async function setupBookmarks(mongo) {
  const names = await collectionNames(mongo);

  if (!names.includes("bookmarks")) {
    const schema = new mongo.Schema({}, { strict: false, versionKey: false });
    const bookmarks = mongo.model("bookmarks", schema);
    const links = new bookmarks({ name: "links", root: true, data: [] });
    await links.save();
  }
}
