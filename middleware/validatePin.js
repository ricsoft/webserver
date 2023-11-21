import { httpStatus } from "../utils/constants.js";

export function validatePin(req, res, next) {
  if (req.headers.authorization === process.env.PIN) next();
  else {
    res.status(httpStatus.unauthorized);
    res.send();
  }
}
