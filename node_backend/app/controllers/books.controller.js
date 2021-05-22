var Book = require("../models/books.model.js");

exports.create = (req, res) => {
  if (!req.body) {
      res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  console.log(req.body)

  const book = new Book({
    id_work: req.body.id_work.toString(),
    id_library: req.body.id_library.toString(),
    year_publishing: req.body.year_publishing.toString(),
    // description: req.body.description.toString() || null,
    // image: req.body.image.toString() || null,
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
