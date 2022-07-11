const sql = require("./db.js");

const Library = function(lib) {
  this.id_user = lib.id_user;
  this.name = lib.name;
  this.description = lib.description || null;
  this.image = lib.image || null;
};

Library.create = (newLib, result) => {
  const queryInsert = "INSERT INTO library SET ?";
  sql.query(queryInsert, newLib, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created lib", { id: res.insertId, ...newLib });

    result(null, { id: res.insertId, ...newLib }); 
  });
};

Library.getLibraries = (libId, result) => {
  let req = `
    SELECT library.id, user.zname as creator, user.id as creator_id, library.name, library.description, library.image
    FROM library left join user
    on library.id_user = user.id
  `;

  if (libId != null)
      req += `WHERE library.id = ${libId}`;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    if (result_sql.length == 0)
      result({'kind': 'not_found'}, null);
    else if (libId != null)
      result(null, result_sql[0]);
    else
      result(null, result_sql);
  });
}
  
module.exports = Library;