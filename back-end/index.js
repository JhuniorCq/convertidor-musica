import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./src/routes/routes.js";
import { errorHandler } from "./errorHandler.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/musics", router);

// Middleware para manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
