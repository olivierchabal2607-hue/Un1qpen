import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendContactRequest } from "@/lib/mail";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const errors = Object.fromEntries(parsed.error.issues.map(i => [String(i.path[0]), i.message]));
      return NextResponse.json({ errors }, { status: 400 });
    }
    await sendContactRequest(parsed.data);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Requête invalide." }, { status: 400 }); }
}
