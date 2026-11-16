// Kontakt va buyurtma formalari uchun umumiy yuborish funksiyasi (klient tomonda).
// Xatolarni foydalanuvchi tilidagi aniq xabar bilan qaytaradi.

const FIELD_KEYS = ["fullName", "email", "message", "contact", "service", "budget"] as const;

type Translate = (key: string) => string;

export async function sendForm(payload: Record<string, unknown>, tErr: Translate, rateLimited: string) {
  let res: Response;
  try {
    res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(tErr("network"));
  }

  if (res.status === 429) throw new Error(rateLimited);

  const data = await res.json().catch(() => ({}));
  if (res.status === 400 && Array.isArray(data.fields) && data.fields.length > 0) {
    const messages = data.fields
      .filter((f: string) => (FIELD_KEYS as readonly string[]).includes(f))
      .map((f: string) => tErr(f));
    throw new Error(messages.length ? messages.join(" ") : tErr("server"));
  }
  if (!res.ok || data.error) throw new Error(tErr("server"));
}
