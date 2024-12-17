import { Router } from "express";
import { convertMusic } from "../controllers/convertController.js";
import { downloadController } from "../controllers/downloadController.js";

const router = Router();

router.post("/convert", convertMusic);
router.get("/download/:file", downloadController);

export { router };
