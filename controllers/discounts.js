import * as discounts from "../db/discounts.js";

export async function getDiscounts(res) {
  const sites = await discounts.get();
  res.render("discounts", { layout: false, sites: sites });
}

export async function post(req) {
  return await discounts.update(req);
}
