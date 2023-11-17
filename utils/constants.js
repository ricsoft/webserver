export const methods = {
  get: "GET",
  post: "POST",
  create: "CREATE",
  delete: "DELETE"
};

export const httpStatus = {
  ok: 200,
  error: 500,
};

export const schema = (mongo) => {
  return new mongo.Schema({}, { strict: false, versionKey: false });
};
