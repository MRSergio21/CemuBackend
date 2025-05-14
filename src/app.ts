import express from "express";
import { router } from "./routes";
import { pool } from "./config/postgres";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function startServer() {
  try {
    await pool.connect();
    console.log("✅ PostgreSQL connected successfully");

  } catch (error) {
    console.error("❌ Error connecting to PostgreSQL:", error);
    process.exit(1);
  }
}

startServer();