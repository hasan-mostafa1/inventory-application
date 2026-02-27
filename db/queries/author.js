const pool = require("../pool");

exports.all = async () => {
  const { rows } = await pool.query("SELECT * FROM authors;");
  return rows;
};

exports.find = async (id) => {
  const { rows } = await pool.query("SELECT * FROM authors WHERE id = $1;", [
    id,
  ]);
  return rows;
};

exports.create = async (fullName, gender, bio, nationality, birthDate) => {
  await pool.query(
    "INSERT INTO authors (full_name, gender, bio, nationality, birth_date) VALUES ($1, $2, $3, $4, $5);",
    [fullName, gender, bio, nationality, birthDate],
  );
};

exports.update = async (id, fullName, gender, bio, nationality, birthDate) => {
  await pool.query(
    "UPDATE authors SET full_name = $1, gender = $2, bio = $3, nationality = $4, birth_date = $5 WHERE id = $6;",
    [fullName, gender, bio, nationality, birthDate, id],
  );
};

exports.delete = async (id) => {
  await pool.query("DELETE FROM authors WHERE id = $1;", [id]);
};
