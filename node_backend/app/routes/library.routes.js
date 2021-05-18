module.exports = app => {
  const libraries = require("../controllers/library.controller.js");

  app.get("/libraries/get_libraries", libraries.getAll);
  app.get("/libraries/get_libraries/:libId", libraries.getAll);
};