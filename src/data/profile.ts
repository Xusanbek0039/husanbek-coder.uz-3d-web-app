import { experience } from "./experience";

/** Sayt egasining asosiy ko'rsatkichlari — barchasi data fayllardan hisoblanadi */

/** Ish tajribasi yillari: eng birinchi ish joyidan hozirgacha (src/data/experience.ts) */
export const experienceYears = (now = new Date()): number => {
  const first = Math.min(...experience.map((e) => e.start));
  return now.getFullYear() - first;
};

/**
 * O'qitilgan o'quvchilar yoki mijozlar soni.
 * null — ma'lumot hali berilmagan, ko'rsatkich saytda chiqmaydi.
 */
export const studentsCount: number | null = null;

/** CV fayli: public/cv/Husan-Suyunov-CV.pdf (bo'lmasa, yuklab olish tugmasi chiqmaydi) */
export const CV_PDF_PATH = "/cv/Husan-Suyunov-CV.pdf";
