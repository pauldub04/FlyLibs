const jwt = require('jsonwebtoken');
const users = require("../controllers/user.controller.js");

module.exports = app => {
  app.post("/auth/login", users.login);
  app.post("/auth/create", users.create);
};

module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};