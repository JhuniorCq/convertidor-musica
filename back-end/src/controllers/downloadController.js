import { MUSIC_PATH } from "../../constants.js";

const downloadController = (req, res, next) => {
  try {
    const { file } = req.params;
    const filePath = `${MUSIC_PATH}/${file}`;

    res.download(filePath);
  } catch (error) {
    console.error("", error.message);
    next(error);
  }
};

export { downloadController };
