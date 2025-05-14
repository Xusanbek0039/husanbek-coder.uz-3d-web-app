// app/api/send/route.ts
import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Zod validatsiyasi
const Email = z.object({
  fullName: z.string().min(2, "To'liq ism noto'g'ri!"),
  email: z.string().email({ message: "Elektron pochta manzili yaroqsiz!" }),
  message: z.string().min(10, "Xabar juda qisqa!"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Keldi:", body);

    // Zod orqali tekshiruv
    const parsed = Email.safeParse(body);
    if (!parsed.success) {
      // Error xabarlarini array ko‘rinishida olish
      const issues = parsed.error.issues.map((issue) => issue.message);
      return NextResponse.json({ error: issues }, { status: 400 });
    }

    const { fullName, email, message } = parsed.data;

    // Email yuborish
    const { data, error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: "Portfeldan men bilan bog'lanishdi",
      react: EmailTemplate({ fullName, email, message }),
    });

    if (resendError) {
      console.error("Resend xatosi:", resendError);
      return NextResponse.json({ error: "Xatolik yuz berdi!" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("Server xatosi:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
