/** Aloqa formasi chegaralari — klient va server (api/send) bir xil qiymatlardan foydalanadi */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 50 },
  message: { min: 10, max: 1000 },
  emailMax: 200,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactField = "fullName" | "email" | "message";

/** Xato bo'lgan maydonlar ro'yxati (bo'sh — hammasi to'g'ri) */
export const validateContact = (v: { fullName: string; email: string; message: string }): ContactField[] => {
  const errors: ContactField[] = [];
  const name = v.fullName.trim();
  const message = v.message.trim();
  if (name.length < CONTACT_LIMITS.name.min || name.length > CONTACT_LIMITS.name.max) errors.push("fullName");
  if (!EMAIL_RE.test(v.email.trim()) || v.email.length > CONTACT_LIMITS.emailMax) errors.push("email");
  if (message.length < CONTACT_LIMITS.message.min || message.length > CONTACT_LIMITS.message.max)
    errors.push("message");
  return errors;
};
