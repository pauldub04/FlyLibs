module.exports = app => {
    const books = require("../controllers/books.controller.js");
  
    app.get("/get_books", books.getBooks);
    app.get("/get_books/:libId", books.getBooks);
  };