import express from "express";
import cors from "cors";
import morgan from "morgan";
import { MUSIC_PATH } from "./constants.js";
import { router } from "./src/routes/routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

app.use("/musics", express.static(MUSIC_PATH));

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
