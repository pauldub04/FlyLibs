module.exports = app => {
  const books = require("../controllers/books.controller.js");

  app.get("/books/get_books", books.getBooks);
  app.get("/books/get_books/lib/:libId", books.getBooks);
};