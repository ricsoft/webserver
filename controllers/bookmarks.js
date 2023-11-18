import { methods } from "../utils/constants.js";
import * as bookmarks from "../db/bookmarks.js";

export async function get() {
  return await bookmarks.get();
}

export async function getFolder(folderId) {
  return await bookmarks.getFolder(folderId);
}

export async function post(req) {
  if (req.method === methods.create) return await bookmarks.create(req);
  if (req.method === methods.delete) return await bookmarks.del(req);
}
