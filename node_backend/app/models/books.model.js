const sql = require("./db.js");

const Book = function(book) {
  this.id_work = book.id_work;
  this.id_library = book.id_library;
  // this.year_publishing = book.year_publishing;
  this.description = book.description || null;
  this.image = book.image || null;
};

Book.create = (newBook, result) => {
  const queryInsert = "INSERT INTO book SET ?";
  sql.query(queryInsert, newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created book", { id: res.insertId, ...newBook });

    result(null, { id: res.insertId, ...newBook }); 
  });
};

Book.addWork = (newWork, result) => {
  const queryInsert = "INSERT INTO work SET ?";
  sql.query(queryInsert, newWork, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created work", { id: res.insertId, ...newWork });

    result(null, { id: res.insertId, ...newWork }); 
  });
};

Book.addAuthor = (newAuthor, result) => {
  const queryInsert = "INSERT INTO author SET ?";
  sql.query(queryInsert, newAuthor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created work", { id: res.insertId, ...newAuthor });

    result(null, { id: res.insertId, ...newAuthor }); 
  });
};

Book.getBooksFromLib = (libId, result) => {
  let req = `
    SELECT book.id, work.name as book_name,
    book.id_library, genre.name as genre,z

    author.name as author_name, author.surname as author_surname, author.patronymic as author_patronymic,
    CONCAT(author.surname, ' ', author.name, ' ', author.patronymic) as author_fullname,
    CONCAT(author.name, ' ', author.surname) as author_shortname


    -- #####################################
    FROM book left join work
    on book.id_work = work.id

    left join author
    on work.id_author = author.id

    left join genre
    on work.id_genre = genre.id
    -- #####################################
  `;

  if (libId != null)
    req += `WHERE book.id_library = ${libId}`;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    result(null, result_sql);
  });
}

Book.getAuthors = (result) => {
  let req = `
    SELECT *,
    CONCAT(author.surname, ' ', author.name, ' ', author.patronymic) as author_fullname,
    CONCAT(author.name, ' ', author.surname) as author_shortname
    FROM author
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

Book.getWorks = (result) => {
  let req = `
    SELECT work.id, work.name, id_genre,
    CONCAT(author.surname, ' ', author.name, ' ', author.patronymic) as author_fullname

    FROM work

    left join author
    on work.id_author = author.id
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
    
Book.getGenres = (result) => {
  let req = `
    SELECT *
    FROM genre
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

Book.deleteBook = (id, result) => {
  let req = `DELETE FROM book WHERE id = ${id}`;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    result(null, result_sql);
  });
}

Book.giveBook = (data, result) => {
  let set = {
    id_owner: data.id_owner.toString(),
    id_user: data.id_user.toString(),
    id_book: data.id_book.toString(),
    // status: 'Запрошена',
  }

  let req = `INSERT INTO book_order SET ?`;

  sql.query(req, set, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    result(null, result_sql);
  });
}

Book.getOrdersById = (data, result) => {

  let req = `
    SELECT book_order.id, work.name, book_order.status
    FROM book_order 
    
    left join book
    on book_order.id_book = book.id

    left join work
    on book.id_work = work.id
  `;
  if (data.type.toString() == 'my') {
    req += `WHERE id_user = ${data.id.toString()}`;
  } else {
    req += `WHERE id_owner = ${data.id.toString()}`;
  }

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    result(null, result_sql);
  });
}

Book.changeStatus = (data, result) => {
  console.log(data)
  let req = `
    UPDATE book_order
    SET status = ${data.status}
    WHERE id = ${data.id}
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

Book.deleteOrder = (id, result) => {
  let req = `DELETE FROM book_order WHERE id = ${id}`;

  sql.query(req, function (err, result_sql, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      throw err;
    }

    result(null, result_sql);
  });
}

module.exports = Book;