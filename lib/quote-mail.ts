import { Resend } from "resend";
import type { QuoteConfiguration } from "./validations";
import { calculatePrice } from "./pricing.mjs";

const labels = {
  penColor: { white: "Blanc", warmGrey: "Warm Grey", black: "Noir" },
  markingColor: { white: "Blanc", warmGrey: "Warm Grey", black: "Noir" },
  markingLocation: { clip: "Sur le clip", body: "Sur le corps" },
};
type QuoteFile = { filename: string; content: Buffer };
function escapeHtml(value = "") { return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character); }

export async function sendQuoteRequest(configuration: QuoteConfiguration, logo: QuoteFile, preview?: QuoteFile) {
  if (process.env.EMAIL_PROVIDER !== "resend") {
    if (process.env.NODE_ENV === "development") {
      console.info("Un1qpen quote request (development only)", { ...configuration, customerDetails: { ...configuration.customerDetails, email: "[redacted]", phone: "[redacted]" }, logo: logo.filename, preview: preview?.filename });
      return { accepted: true, simulated: true };
    }
    throw new Error("Le service d’envoi de devis n’est pas configuré.");
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Le service d’envoi de devis n’est pas configuré.");
  const resend = new Resend(apiKey);
  const recipient = process.env.CONTACT_EMAIL || "contact@un1qpen.fr";
  const from = process.env.EMAIL_FROM || "Un1qpen <site@un1qpen.com>";
  const customer = configuration.customerDetails;
  const price = calculatePrice(configuration.quantity, configuration.markingColorCount);
  const currency = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const rows = [
    ["Société", customer.company], ["Contact", `${customer.firstName} ${customer.lastName}`],
    ["E-mail", customer.email], ["Téléphone", customer.phone],
    ["Livraison souhaitée", customer.deliveryDate || "Non renseignée"],
    ["Couleur du stylo", labels.penColor[configuration.penColor]],
    ["Couleur du marquage", labels.markingColor[configuration.markingColor]],
    ["Nombre de couleurs", configuration.markingColorCount.toString()],
    ["Emplacement", labels.markingLocation[configuration.markingLocation]],
    ["Quantité", configuration.quantity.toLocaleString("fr-FR")], ["Vue active", configuration.activeView],
    ["Prix unitaire HT", `${currency.format(price.unitPrice)} / stylo`],
    ["Prix total HT", currency.format(price.totalPrice)],
    ["Logo clip", `échelle ${configuration.logoTransforms.clip.scale}, rotation ${configuration.logoTransforms.clip.rotation}°, x ${configuration.logoTransforms.clip.position.x.toFixed(3)}, y ${configuration.logoTransforms.clip.position.y.toFixed(3)}`],
    ["Logo corps", `échelle ${configuration.logoTransforms.body.scale}, rotation ${configuration.logoTransforms.body.rotation}°, x ${configuration.logoTransforms.body.position.x.toFixed(3)}, y ${configuration.logoTransforms.body.position.y.toFixed(3)}`],
  ];
  const attachments = [logo, ...(preview ? [preview] : [])];
  const { data, error } = await resend.emails.send({
    from, to: recipient, replyTo: customer.email,
    subject: `[Un1qpen] Demande de devis — ${customer.company} — ${configuration.quantity} pièces`,
    text: `${rows.map(([key, value]) => `${key} : ${value}`).join("\n")}\n\nCommentaire :\n${customer.comment || "Aucun commentaire"}`,
    html: `<div style="font-family:Arial,sans-serif;color:#1d1d1f;line-height:1.6"><h1>Nouvelle configuration Un1qpen</h1><table style="border-collapse:collapse;width:100%;max-width:720px">${rows.map(([key, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #ddd;color:#555">${escapeHtml(key)}</td><td style="padding:8px 12px;border-bottom:1px solid #ddd"><strong>${escapeHtml(value)}</strong></td></tr>`).join("")}</table><h2 style="margin-top:28px;font-size:18px">Commentaire</h2><p style="white-space:pre-wrap">${escapeHtml(customer.comment || "Aucun commentaire")}</p></div>`,
    attachments,
  });
  if (error) throw new Error(`Resend delivery failed: ${error.message}`);
  return { accepted: true, id: data?.id };
}
