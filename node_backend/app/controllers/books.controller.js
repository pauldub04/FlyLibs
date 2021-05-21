var Book = require("../models/books.model.js");

exports.create = (req, res) => {
  if (!req.body) {
      res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  const book = new Book({});
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
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(data);
      }
    });
  };