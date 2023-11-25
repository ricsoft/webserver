import * as discounts from "../db/discounts.js";

export async function post(req) {
  return await discounts.update(req);
}
