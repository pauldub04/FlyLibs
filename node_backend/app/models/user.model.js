const sql = require("./db.js");

const User = function() {};

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