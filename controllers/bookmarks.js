import { methods } from "../utils/constants.js";
import { create } from "../db/bookmarks.js";

export async function post(req) {
  if (req.method === methods.create) return await create(req);
}
