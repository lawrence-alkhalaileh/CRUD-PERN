import pgk from "pg";
import env from "dotenv";

env.config();

const { Pool } = pgk;

const db = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_DOMAIN_HOST,
  database: process.env.POSTGRES_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});


db.connect();

db.on("error", (err) => {
  console.error("An error occurred:", err);
  process.exit(-1);
});

export const query = (text, params) => db.query(text, params);
