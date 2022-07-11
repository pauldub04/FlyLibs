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
      console.lozg("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created user", { id: res.insertId, ...newUser });

    let ret = {
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
    }

    result(null, { id: res.insertId, ...ret }); 
  });
};

User.update = (changeUser, result) => {
  const req = `
    UPDATE user
    SET username = "${changeUser.username}", email = "${changeUser.email}",
      name = "${changeUser.name}", surname = "${changeUser.surname}"
    WHERE id = "${changeUser.id}"
  `;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(result_sql)
    result(null, result_sql);
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

User.getUserById = (id, result) => {
  let req = `
    SELECT id, username, email, name, surname, role
    FROM user

    WHERE id = "${id}"
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

User.getAdmins = (result) => {
  let req = `
    SELECT *
    FROM user
    WHERE role like 'admin'
  `;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    result(null, result_sql);
  });
}

User.getUsers = (result) => {
  let req = `
    SELECT *
    FROM user
  `;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    result(null, result_sql);
  });
}

User.makeAdmin = (id, result) => {
  let req = `
    UPDATE user
    SET role = "admin"
    WHERE id = ${id}
  `;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    result(null, result_sql);
  });
}

  
module.exports = User;