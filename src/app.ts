import express from "express";
import cors from "cors";
import { RegisterRoutes } from "./dist/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./dist/swagger.json";
import { prisma } from "./config/prisma";

const app = express();
const PORT = process.env.PORT || 3002;

// CORS
app.use(cors({
  origin: "http://localhost:2000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Aumentar límite de body
app.use(express.json({ limit: "50mb" })); // <-- aquí
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // <-- y aquí

// Registrar rutas
RegisterRoutes(app);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Conectar Prisma
async function startServer() {
  try {
    await prisma.$connect();
    console.log("Prisma connected to PostgreSQL successfully");
  } catch (error) {
    console.error("Error connecting Prisma to PostgreSQL:", error);
    process.exit(1);
  }
}

startServer();
