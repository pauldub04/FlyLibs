const jwt = require('jsonwebtoken');
const sql = require("../models/db");
const bcrypt = require('bcryptjs');

const isValidPassword = function(user, password) {
  return bcrypt.compareSync(password.toString(), user.password.toString());
}
  // const p5 = bcrypt.hashSync("123", bcrypt.genSaltSync(10), null);

const generateToken = function(user) {
  return jwt.sign({ username: user.username,  role: user.role }, process.env.TOKEN_SECRET);
  // const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = app => {
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let user = null;

    let req_sql = `
      SELECT *
      FROM user
      WHERE username like "${username}"
    `;

    sql.query(req_sql, function (err, result_sql, fields) {
      if (err) {
        console.log("error: ", err);
        throw err;
      }

      if (result_sql.length != 0)
        user = result_sql[0];

      if (user && isValidPassword(user, password)) {
        const accessToken = generateToken(user);
  
        res.json({
          accessToken
        });
      } else {
        res.send('Username or password are incorrect');
      }
    });
    
  });
};

module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};