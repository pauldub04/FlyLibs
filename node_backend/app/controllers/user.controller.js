const sql = require("../models/db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var User = require("../models/user.model.js");


const hashPassword = function(password) {
  try {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  } catch(error) {
    throw error
  }
}
const isValidPassword = function(user, password) {
  return bcrypt.compareSync(password, user.password);
}
const generateToken = function(user) {
  return jwt.sign({ username: user.username,  role: user.role }, process.env.TOKEN_SECRET);
  // const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


exports.login = (req, res) => {
  const username = req.body.username.toString();
  const password = req.body.password.toString();
  let user = null;

  let req_sql = `
    SELECT *
    FROM user
    WHERE username like "${username}"
  `;

  sql.query(req_sql, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);z
      throw err;
    }

    if (result_sql.length != 0)
      user = result_sql[0];

    if (user && isValidPassword(user, password)) {
      const accessToken = generateToken(user);
      delete user.password;

      res.json({
        accessToken,
        user
      });
    } else {
      res.status(401).send('Username or password are incorrect');
    }
  });
}

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  const user = new User({
    username: req.body.username.toString(),
    email: req.body.email.toString(),
    password: hashPassword(req.body.password.toString()),
    name: req.body.name.toString(),
    surname: req.body.surname.toString(),
  });

  User.create(user, (err, data) => {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY')
        res.status(500).send({
          message: 'Such username is already taken'
        });
      else
        res.status(500).send({
          message:
            err.message || "Произошла ошибка во время выполнения кода"
        });
    }
    else res.send(data);
  });
}


exports.getUserById = (req, res) => {
  const userId = req.body.id || req.params.id
  User.getUserById(userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cant find user with id ${userId}`
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

exports.getUserByUsername = (req, res) => {
  const username = req.body.username || req.params.username
  User.getUserByUsername(username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cant find user with username ${username}`
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

exports.updateUser = (req, res) => {
  console.log(req.body)
  let changeUser = {
    id: req.body.id.toString(),
    username: req.body.username.toString(),
    email: req.body.email.toString(),
    name: req.body.name.toString(),
    surname: req.body.surname.toString(),
  };

  User.update(changeUser, (err, data) => {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY')
        res.status(500).send({
          message: 'Such username is already taken'
        });
      else
        res.status(500).send({
          message:
            err.message || "Произошла ошибка во время выполнения кода"
        });
    }
    else {
      res.send(data);
    }
  });
};

exports.testAuth = (req, res) => {
  const { role } = req.user;

  res.send(role);
}

exports.testAdmin = (req, res) => {
  const { role } = req.user;
  
  if (role !== 'admin') {
      return res.sendStatus(403);
  }

  res.send(role);
}

exports.getAdmins = (req, res) => {
  User.getAdmins((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while getting admins"
      });
    else {
      res.send(data);
    }
  });
};

exports.getUsers = (req, res) => {
  User.getUsers((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while getting users"
      });
    else {
      res.send(data);
    }
  });
};

exports.makeAdmin = (req, res) => {
  User.makeAdmin(req.body.id.toString(), (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while making admin"
      });
    else {
      res.send(data);
    }
  });
};


