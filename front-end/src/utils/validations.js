import { z } from "zod";

const urlSchema = z
  .string()
  .min(1, { message: "Ingrese una URL" })
  .url({ message: "URL inválida" });

export const validateMusicURL = (url) => {
  return urlSchema.safeParse(url);
};
