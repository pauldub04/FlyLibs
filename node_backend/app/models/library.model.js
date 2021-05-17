const sql = require("./db.js");

const Library = function() {};

Library.getLibraries = (libId, result) => {
  let req = `
    SELECT library.id, user.name as creator, user.id as creator_id, library.name, library.description, library.image
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

    // console.log(result_sql)

    if (libId != null)
      result(null, result_sql[0]);
    else
      result(null, result_sql);
  });
}
  
module.exports = Library;