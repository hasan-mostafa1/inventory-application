const pool = require("../pool");

exports.create = async (authorId, bookId) => {
  await pool.query(
    "INSERT INTO books_authors (author_id, book_id) VALUES ($1, $2);",
    [authorId, bookId],
  );
};

exports.delete = async (authorId, bookId) => {
  await pool.query(
    "DELETE FROM books_authors WHERE author_id = $1 AND book_id = $2;",
    [authorId, bookId],
  );
};

exports.deleteBookAuthors = async (bookId) => {
  await pool.query("DELETE FROM books_authors WHERE book_id = $1;", [bookId]);
};
