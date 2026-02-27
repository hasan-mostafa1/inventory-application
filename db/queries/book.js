const pool = require("../pool");

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
  await pool.query(
    "INSERT INTO books (title, short_description, long_description, publication_date) VALUES ($1, $2, $3, $4);",
    [title, shortDescription, longDescription, publicationDate],
  );
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
