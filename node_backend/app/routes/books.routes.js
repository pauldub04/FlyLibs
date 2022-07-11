module.exports = app => {
  const books = require("../controllers/books.controller.js");
  const auth = require('./auth.routes');

  //for image saving-----------------------------------
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb('Not an image', false);
  }
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter,
  });
  //-----------------------------------------------------
  

  app.get("/books/get_books", books.getBooks);
  app.get("/books/get_books/lib/:libId", books.getBooks);


  app.get("/books/get_works", books.getWorks);
  app.get("/books/get_authors", books.getAuthors);
  app.get("/books/get_genres", books.getGenres);

  app.post("/books/addBook", auth.authenticateJWT, upload.single('image'), books.create);
  app.post("/books/addWork", auth.authenticateJWT, books.addWork);
  app.post("/books/addAuthor", auth.authenticateJWT, books.addAuthor);

  app.post("/books/deleteBook", auth.authenticateJWT, books.deleteBook);
  app.post("/books/giveBook", auth.authenticateJWT, books.giveBook);


  app.post("/orders/getOrdersById", auth.authenticateJWT, books.getOrdersById);
  app.post("/orders/changeStatus", auth.authenticateJWT, books.changeStatus);
  app.post("/orders/deleteOrder", auth.authenticateJWT, books.deleteOrder);
};