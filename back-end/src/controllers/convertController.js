import path from "node:path";
import { MUSIC_PATH } from "../../constants.js";
import youtubedl from "youtube-dl-exec";

const convertMusic = async (req, res, next) => {
  try {
    const { url } = req.body;

    if (!url) {
      throw new Error("Ingrese una URL válida");
    }

    // Obtener título del video
    const { title } = await youtubedl(url, {
      dumpSingleJson: true, // Obtener JSON con información del video
    });

    // Limpiar el título para usarlo como nombre de archivo
    const sanitizedTitle = title.replace(/[\\\/:*?"<>|]/g, "");

    // Crear la ruta de salida con el título del video
    const outputPath = path.resolve(MUSIC_PATH, `${sanitizedTitle}.mp3`);
    console.log("Título del video:", title);
    console.log("Ruta de salida:", outputPath);

    await youtubedl(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: outputPath,
    });

    res.json({ success: true, title: sanitizedTitle });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { convertMusic };
