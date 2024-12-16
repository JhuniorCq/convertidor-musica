import path from "node:path";
import { MUSIC_PATH } from "../../constants.js";
import youtubedl from "youtube-dl-exec";

const convertMusic = async (req, res) => {
  try {
    const { url } = req.body;

    const outputPath = path.resolve(MUSIC_PATH, `${Date.now()}.mp3`);
    console.log(Date.now(), `${Date.now()}`);
    console.log(outputPath);

    await youtubedl(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: outputPath,
    });

    res.json({ success: true, title: outputPath });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error al convertir el video" });
  }
};

export { convertMusic };
