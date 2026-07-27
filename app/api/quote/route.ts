import { NextResponse } from "next/server";
import { quoteConfigurationSchema } from "@/lib/validations";
import { ACCEPTED_LOGO_TYPES, MAX_LOGO_BYTES } from "@/lib/configurator";
import { sendQuoteRequest } from "@/lib/quote-mail";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const configurationValue = formData.get("configuration");
    const logo = formData.get("logo");
    const preview = formData.get("preview");
    if (typeof configurationValue !== "string") return NextResponse.json({ error: "Configuration manquante." }, { status: 400 });
    const parsed = quoteConfigurationSchema.safeParse(JSON.parse(configurationValue));
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Configuration invalide." }, { status: 400 });
    if (!(logo instanceof File)) return NextResponse.json({ error: "Le fichier logo est obligatoire." }, { status: 400 });
    if (logo.size > MAX_LOGO_BYTES) return NextResponse.json({ error: "Le fichier logo dépasse 10 Mo." }, { status: 400 });
    if (!ACCEPTED_LOGO_TYPES.includes(logo.type)) return NextResponse.json({ error: "Le format du logo n’est pas accepté." }, { status: 400 });
    const logoAttachment = { filename: logo.name, content: Buffer.from(await logo.arrayBuffer()) };
    const previewAttachment = preview instanceof File && preview.size ? { filename: "apercu-un1qpen.png", content: Buffer.from(await preview.arrayBuffer()) } : undefined;
    await sendQuoteRequest(parsed.data, logoAttachment, previewAttachment);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote request failed", error);
    return NextResponse.json({ error: "L’envoi du devis a échoué. Vous pouvez nous écrire à contact@un1qpen.fr." }, { status: 500 });
  }
}
