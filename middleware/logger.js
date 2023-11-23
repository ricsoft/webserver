export function logger(req, res, next) {
  let date = new Date();
  date = date.toLocaleString("en-US", {
    timeZone: "America/Vancouver",
  });
  console.log(`${date}, ${req.method} ${req.url}`);
  next();
}
