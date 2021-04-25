const sql = require("./db.js");

const Library = function() {};

Library.get_libraries = (result) => {
    sql.query("SELECT * FROM library", function (err, result_sql, fields) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        throw err;
      }
      
      result(null, result_sql);
    });
  }
  
module.exports = Library;