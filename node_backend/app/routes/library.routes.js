module.exports = app => {
  const libraries = require("../controllers/library.controller.js");
  const auth = require('./auth.routes');

  app.get("/libraries/get_libraries", libraries.getAll);
  app.get("/libraries/get_libraries/:libId", libraries.getAll);

  app.post("/libraries/create", auth.authenticateJWT, libraries.create);
};