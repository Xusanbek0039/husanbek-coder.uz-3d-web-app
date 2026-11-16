import { notFound } from "next/navigation";

// Mavjud bo'lmagan yo'llar [locale] layout ichidagi chiroyli 404 sahifasini ko'rsatsin
export default function CatchAll() {
  notFound();
}
