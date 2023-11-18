import { actions } from "../utils/constants.js";
import * as bookmarks from "../db/bookmarks.js";

export async function get() {
  return await bookmarks.get();
}

export async function getFolder(folderId) {
  return await bookmarks.getFolder(folderId);
}

export async function post(req) {
  if (req.action === actions.create) return await bookmarks.create(req);
  if (req.action === actions.delete) return await bookmarks.del(req);
  if (req.action === actions.edit) return await bookmarks.edit(req);
}
