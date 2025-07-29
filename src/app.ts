import express from "express";
import { RegisterRoutes } from "./dist/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./dist/swagger.json";
import { prisma } from "./config/prisma";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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