import { Router } from "express";
import { convertMusic } from "../controllers/convertController.js";

const router = Router();

router.post("/convert", convertMusic);

export { router };
