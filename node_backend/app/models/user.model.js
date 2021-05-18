const sql = require("./db.js");

const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.name = user.name || null;
  this.surname = user.surname || null;
  this.role = 'user';
};

User.create = (newUser, result) => {
  const queryInsert = "INSERT INTO user SET ?";
  sql.query(queryInsert, newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created user", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser }); 
  });
};

User.getUserByUsername = (username, result) => {
  let req = `
    SELECT id, username, email, name, surname, role
    FROM user

    WHERE username like "${username}"
  `;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    console.log('in model', result_sql)
    if (result_sql.length == 0)
      result({'kind': 'not_found'}, null);
    else
      result(null, result_sql[0]);
  });
}
  
module.exports = User;