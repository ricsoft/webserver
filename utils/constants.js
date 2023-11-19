export const actions = {
  backup: "backup",
  create: "create",
  edit: "edit",
  delete: "delete",
  restore: "restore",
};

export const httpStatus = {
  ok: 200,
  error: 500,
};

export const schema = (mongo) => {
  return new mongo.Schema({}, { strict: false, versionKey: false });
};
