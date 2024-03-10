export function isAuthenticated(req, res, next) {
  console.log({
    req: {
      user: req.user,
      passport: req.passport,
    },
  });
  console.log({ "Authenticated User": req.isAuthenticated() });
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Unauthorised",
    });
  }

  return next();
}
