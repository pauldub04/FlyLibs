module.exports = app => {
  const libraries = require("../controllers/library.controller.js");

  app.get("/get_libraries", libraries.getAll);
  app.get("/get_libraries/:libId", libraries.getAll);
};