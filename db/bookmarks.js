import { schema } from "../utils/constants.js";
import { connect } from "./db.js";

export async function setupBookmarks(mongo, collNames) {
  if (!collNames.includes("bookmarks")) {
    const Bookmarks = mongo.model("bookmarks", schema(mongo));
    const links = new Bookmarks({
      name: "links",
      root: true,
      data: [],
    });
    await links.save();
  }
}

export async function createLink(req) {
  const filter = { name: "links", root: true };
  const mongo = await connect();
  const Bookmarks = mongo.model("bookmarks", schema(mongo));

  const document = await Bookmarks.findOne(filter);
  const res = await Bookmarks.updateOne(filter, {
    data: [...document.data, { name: req.name, link: req.link }],
  });

  return res.modifiedCount === 1;
}

export async function createFolder(req) {}
