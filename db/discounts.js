import { schema } from "../utils/utils.js";
import { connect } from "./db.js";

export async function setupDiscounts(mongo, collNames) {
  if (!collNames.includes("discounts")) {
    await mongo.connection.createCollection("discounts");
  }
}

export async function get() {
  const mongo = await connect();
  const discounts =
    mongo.models.discounts || mongo.model("discounts", schema(mongo));

  const documents = await discounts.find();
  await mongo.connection.close();

  return documents;
}

export async function update(sites) {
  const mongo = await connect();
  const discounts =
    mongo.models.discounts || mongo.model("discounts", schema(mongo));

  let filter, res;
  for (let i = 0; i < sites.length; i++) {
    filter = { site: sites[i].site };
    res = await discounts.replaceOne(
      filter,
      {
        site: sites[i].site,
        lastUpdated: sites[i].lastUpdated,
        data: sites[i].data,
      },
      { upsert: true }
    );
  }

  await mongo.connection.close();
  return res.modifiedCount === 1 || res.upsertedCount === 1;
}
