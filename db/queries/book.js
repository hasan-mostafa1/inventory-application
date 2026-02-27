const pool = require("../pool");
const bookAuthor = require("./bookAuthor");

exports.all = async () => {
  const { rows } = await pool.query("SELECT * FROM books;");
  return rows;
};

exports.find = async (id) => {
  const { rows } = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
  return rows;
};

exports.create = async (
  title,
  shortDescription,
  longDescription,
  publicationDate,
) => {
  const { rows } = await pool.query(
    "INSERT INTO books (title, short_description, long_description, publication_date) VALUES ($1, $2, $3, $4) RETURNING *;",
    [title, shortDescription, longDescription, publicationDate],
  );

  return rows[0];
};

exports.update = async (
  id,
  title,
  shortDescription,
  longDescription,
  publicationDate,
) => {
  await pool.query(
    "UPDATE books SET title = $1, short_description = $2, long_description = $3, publication_date = $4 WHERE id = $5;",
    [title, shortDescription, longDescription, publicationDate, id],
  );
};

exports.delete = async (id) => {
  await pool.query("DELETE FROM books WHERE id = $1;", [id]);
};

exports.AllWithAuthors = async () => {
  const { rows } = await pool.query(
    "SELECT books.*, JSON_AGG(JSON_BUILD_OBJECT('author_id', a.id, 'author_name', a.full_name)) AS authors FROM books LEFT JOIN books_authors AS ba ON books.id = ba.book_id LEFT JOIN authors AS a ON ba.author_id = a.id GROUP BY books.id;",
  );
  return rows;
};

exports.findWithAuthors = async (id) => {
  const { rows } = await pool.query(
    "SELECT books.*, JSON_AGG(JSON_BUILD_OBJECT('author_id', a.id, 'author_name', a.full_name)) AS authors FROM books LEFT JOIN books_authors AS ba ON books.id = ba.book_id LEFT JOIN authors AS a ON ba.author_id = a.id WHERE books.id = $1 GROUP BY books.id;",
    [id],
  );
  return rows;
};

exports.attach = async (bookId, authorIds) => {
  authorIds.forEach(async (authorId) => {
    await bookAuthor.create(authorId, bookId);
  });
};

exports.sync = async (bookId, authorIds) => {
  await bookAuthor.deleteBookAuthors(bookId);
  authorIds.forEach(async (authorId) => {
    await bookAuthor.create(authorId, bookId);
  });
};
