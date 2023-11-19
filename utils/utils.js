import { httpStatus } from "../utils/constants.js";

export const schema = (mongo) => {
  return new mongo.Schema({}, { strict: false, versionKey: false });
};

export function checkData(args) {
  if (args.data) {
    args.res.status(httpStatus.ok);
    args.res.json(args.data);
  }

  args.res.status(httpStatus.error);
  args.res.send();
}
