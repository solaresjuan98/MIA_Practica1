import { createPool } from "mysql2/promise";

export async function connect() {
  const connection = await createPool({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "grand_virus_epicenter",
    connectionLimit: 10
  });

  return connection;
}
