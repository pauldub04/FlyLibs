var Library = require("../models/library.model.js");

exports.create = (req, res) => {
  if (!req.body) {
      res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  const library = new Library({});
}

exports.getAll = (req, res) => {
    Library.get_libraries((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while getting libs"
        });
      else {
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(data);
      }
    });
  };