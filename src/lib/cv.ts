import "server-only";
import { existsSync } from "fs";
import path from "path";
import { CV_PDF_PATH } from "@/data/profile";

/** CV PDF public/ papkasida bormi — yo'q bo'lsa tugmani yashiramiz */
export const hasCvPdf = (): boolean =>
  existsSync(path.join(process.cwd(), "public", CV_PDF_PATH));
