const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS books_authors (
    author_id INTEGER REFERENCES authors(id),
    book_id INTEGER REFERENCES books(id)
);`;

async function main() {
  console.log("Running books_authors migration...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
