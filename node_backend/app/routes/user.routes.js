module.exports = app => {
  const users = require("../controllers/user.controller.js");

  app.post("/get_user", users.getUser);
};