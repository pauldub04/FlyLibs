const sql = require("./db.js");

const Book = function() {};

Book.getBooksFromLib = (libId, result) => {
    let req = `
      SELECT publication.id, book.name as book_name, book.description, book.image,
      publication.id_library, genre.name as genre,

      author.name as author_name, author.surname as author_surname, author.patronymic as author_patronymic,
      CONCAT(author.surname, ' ', author.name, ' ', author.patronymic) as author_fullname,
      CONCAT(author.surname, ' ', author.name) as author_shortname,

      publisher.name as publisher, year_publishing, 
      place.cupboard, place.shelf, type

      -- #####################################
      FROM publication left join book
      on publication.id_book = book.id

      left join author
      on book.id_author = author.id

      left join genre
      on book.id_genre = genre.id

      left join publisher
      on publication.id_publisher = publisher.id

      left join place
      on publication.id_place = place.id
      -- #####################################

    `;

    if (libId != null)
      req += `WHERE publication.id_library = ${libId}`;

    sql.query(req, function (err, result_sql, fields) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        throw err;
      }
  
      if (result_sql.length == 0)
        result({'kind': 'not_found'}, null);
      else
        result(null, result_sql);
    });
  }
    
  module.exports = Book;