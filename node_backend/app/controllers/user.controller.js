var User = require("../models/user.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  const user = new User({});
}

exports.getUser = (req, res) => {
  User.getUserByUsername(req.body.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cant find user with username ${req.body.username}`
        });
      } else {
        res.status(500).send({
          message: err.message || "Error while getting user"
        });
      }
    }
    else {
      // res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      res.send(data);
    }
  });
};

exports.getUserForAuth = (req, res) => {
  User.getUserByUsername(req.body.username, (err, data) => {
    console.log(err, data);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cant find user with username ${req.body.username}`
        });
      } else {
        res.status(500).send({
          message: err.message || "Error while getting user"
        });
      }
    }
    else {
      res.send(data);
    }
  });
};