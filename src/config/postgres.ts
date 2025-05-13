import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DB_URI,
});

async function dbConnect(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL conectado correctamente");
    client.release();
  } catch (error) {
    console.error("Error al conectar con PostgreSQL:", error);
    process.exit(1);
  }
}

export default dbConnect;