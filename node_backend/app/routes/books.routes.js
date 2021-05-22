module.exports = app => {
  const books = require("../controllers/books.controller.js");
  const auth = require('./auth.routes');

  app.get("/books/get_books", books.getBooks);
  app.get("/books/get_books/lib/:libId", books.getBooks);


  app.get("/books/get_works", books.getWorks);
  app.get("/books/get_authors", books.getAuthors);

  app.post("/books/addBook", auth.authenticateJWT, books.create);
};