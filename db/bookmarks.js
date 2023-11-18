import { schema } from "../utils/constants.js";
import { connect } from "./db.js";
import { v4 as uuidv4 } from "uuid";

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

export async function get() {
  const mongo = await connect();
  const bookmarks =
    mongo.models.bookmarks || mongo.model("bookmarks", schema(mongo));

  const document = await bookmarks.findOne({ name: "links", root: true });
  const data = document.data;
  mongo.connection.close();

  return data;
}

export async function getFolder(folderId) {
  const mongo = await connect();
  const bookmarks =
    mongo.models.bookmarks || mongo.model("bookmarks", schema(mongo));

  const document = await bookmarks.findOne({ _id: folderId });
  const data = document.data;
  mongo.connection.close();

  return data;
}

export async function create(req) {
  let filter = { name: "links", root: true };

  if (req?.folderId) {
    filter = { _id: req.folderId };
  }

  const newData = {
    uid: uuidv4(),
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

export async function del(req) {
  let filter = { name: "links", root: true };

  if (req?.fromFolder) {
    filter = { _id: req.fromFolder };
  }

  const mongo = await connect();
  const bookmarks =
    mongo.models.bookmarks || mongo.model("bookmarks", schema(mongo));

  const document = await bookmarks.findOne(filter);
  const index = document.data.findIndex((link) => link.uid === req.uid);

  if (document.data[index]?.isFolder) {
    await bookmarks.deleteOne({ _id: document.data[index].link });
  }

  document.data.splice(index, 1);
  const res = await bookmarks.updateOne(filter, {
    data: [...document.data],
  });
  mongo.connection.close();

  return res.modifiedCount === 1;
}
