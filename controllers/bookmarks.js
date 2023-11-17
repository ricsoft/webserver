import { methods } from "../utils/constants.js";
import { getBookmarks, create, del } from "../db/bookmarks.js";

export async function get() {
  return await getBookmarks();
}

export async function post(req) {
  if (req.method === methods.create) return await create(req);
  if (req.method === methods.delete) return await del(req);
}
