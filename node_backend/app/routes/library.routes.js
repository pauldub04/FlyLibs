module.exports = app => {
  const libraries = require("../controllers/library.controller.js");

  app.get("/libraries", libraries.getAll);
};