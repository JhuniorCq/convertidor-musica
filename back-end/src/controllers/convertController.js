import path from "node:path";
import { MUSIC_PATH } from "../../constants.js";
import youtubedl from "youtube-dl-exec";

const convertMusic = async (req, res) => {
  try {
    const { url } = req.body;

    // Obtener metadatos del video, incluyendo el título.
    const { title } = await youtubedl(url, {
      dumpSingleJson: true, // Obtener JSON con información del video
    });

    // Limpiar el título para usarlo como nombre de archivo
    const sanitizedTitle = title.replace(/[\\\/:*?"<>|]/g, ""); // Eliminar caracteres no válidos en el nombre del archivo

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
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error al convertir el video" });
  }
};

export { convertMusic };
