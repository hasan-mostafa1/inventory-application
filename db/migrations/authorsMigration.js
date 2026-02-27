const { Client } = require("pg");

const SQL = `
CREATE TYPE sex AS ENUM ('male','female','other');
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name VARCHAR(255) NOT NULL,
    gender sex NOT NULL,
    bio TEXT,
    nationality VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL
);`;

async function main() {
  console.log("Running authors migration...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
