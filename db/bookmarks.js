import { schema } from "../utils/constants.js";
import { connect } from "./db.js";

export async function setupBookmarks(mongo, collNames) {
  if (!collNames.includes("bookmarks")) {
    const bookmarks =
      mongo.models.bookmarks || mongo.model("bookmarks", schema(mongo));
    const links = new bookmarks({
      name: "links",
      root: true,
      data: [],
    });

    await links.save();
  }
}

export async function create(req) {
  let filter = { name: "links", root: true };
  const newData = {
    name: req.name,
    link: req.link,
  };

  const mongo = await connect();
  const bookmarks =
    mongo.models.bookmarks || mongo.model("bookmarks", schema(mongo));

  if (!req.link) {
    const folder = new bookmarks({
      name: req.name,
      data: [],
    });

    const folderRes = await folder.save();
    newData.link = folderRes._id;
    newData.isFolder = true;
  }

  const document = await bookmarks.findOne(filter);
  const res = await bookmarks.updateOne(filter, {
    data: [...document.data, newData],
  });
  mongo.connection.close();

  return res.modifiedCount === 1;
}
