import { methods } from "../utils/constants.js";
import { createLink, createFolder } from "../db/bookmarks.js";

export async function post(req) {
  if (req.method === methods.create) return await create(req);
}

async function create(req) {
  if (req.link) return await createLink(req);
  // else return await createFolder(req)
}
