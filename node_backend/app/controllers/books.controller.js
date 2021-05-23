var Book = require("../models/books.model.js");
const sql = require("../models/db");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  let req_sql = `
    SELECT library.id, user.username as creator, user.id as creator_id, library.name, library.description, library.image
    FROM library left join user
    on library.id_user = user.id

    WHERE library.id = ${req.body.id_library}
  `;

  sql.query(req_sql, function (err, result_sql, fields) {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Произошла ошибка во время выполнения кода"
      });
      return;
    }

    if (result_sql[0].creator != req.user.username) {
      res.status(500).send({
        message: "You cant add book in this lib"
      });
      return;
    } else {
      const book = new Book({
        id_work: req.body.id_work.toString(),
        id_library: req.body.id_library.toString(),
        // year_publishing: req.body.year_publishing.toString(),
      });
    
      Book.create(book, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Произошла ошибка во время выполнения кода"
          });
        }
        else res.send(data);
      });
    }

  });
}

exports.getBooks = (req, res) => {
  Book.getBooksFromLib(req.params.libId, (err, data) => {
    if (err)
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cant find books from lib with id ${req.params.libId}`
        });
      } else {
        res.status(500).send({
          message: err.message || "Error while getting books"
        });
      }
    else {
      res.send(data);
    }
  });
};

exports.getAuthors = (req, res) => {
  Book.getAuthors((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while getting authors"
      });
    else {
      res.send(data);
    }
  });
};

exports.getWorks = (req, res) => {
  Book.getWorks((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while getting authors"
      });
    else {
      res.send(data);
    }
  });
};

exports.getGenres = (req, res) => {
  Book.getGenres((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while getting genres"
      });
    else {
      res.send(data);
    }
  });
};

exports.addWork = (req, res) => {
  const work = {
    name: req.body.name.toString(),
    id_author: req.body.id_author.toString(),
    id_genre: req.body.id_genre.toString(),
  };

  Book.addWork(work, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while adding work"
      });
    else {
      res.send(data);
    }
  });
};

exports.addAuthor = (req, res) => {
  const author = {
    name: req.body.name.toString(),
    surname: req.body.surname.toString(),
    patronymic: req.body.patronymic.toString(),
    bio: null,
  };

  Book.addAuthor(author, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while adding author"
      });
    else {
      res.send(data);
    }
  });
};

exports.deleteBook = (req, res) => {
  let id = req.body.id;

  Book.deleteBook(id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while deleting book"
      });
    else {
      res.send(data);
    }
  });
};