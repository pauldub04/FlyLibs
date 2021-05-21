module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const auth = require('./auth.routes');

  app.post("/users/get_user", users.getUser);
  app.get("/users/get_user/:username", users.getUser);

  app.get("/users/testadmin", auth.authenticateJWT, users.testAdmin);
  app.get("/users/testauth", auth.authenticateJWT, users.testAuth);
};