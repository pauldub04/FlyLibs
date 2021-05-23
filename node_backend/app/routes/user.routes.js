module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const auth = require('./auth.routes');

  app.post("/users/get_user", users.getUserById);
  app.get("/users/get_user/:id", users.getUserById);
  app.get("/users/get_admins", users.getAdmins);
  app.get("/users/get_users", users.getUsers);

  app.post("/users/make_admin", auth.adminJWT, users.makeAdmin);

  app.post("/users/update/:id", auth.authenticateJWT, users.updateUser);

  app.get("/users/testadmin", auth.authenticateJWT, users.testAdmin);
  app.get("/users/testauth", auth.authenticateJWT, users.testAuth);
};