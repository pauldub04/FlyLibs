const sql = require("./db.js");

const Library = function() {};

Library.get_libraries = (result) => {
  let req = `
    SELECT library.id, user.name as creator, user.id as creator_id, library.name, library.description, library.image
    FROM library left join user
    on library.id_user = user.id
  `;
  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    console.log(result_sql)

    result(null, result_sql);
  });
}
  
module.exports = Library;