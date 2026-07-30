import { Resend } from "resend";
import type { ContactInput } from "./validations";

const requestLabels: Record<string, string> = {
  sample: "Demande d’échantillon",
  price: "Demande de tarif",
  partner: "Devenir distributeur",
  technical: "Demande technique",
  press: "Presse et communication",
  other: "Autre",
};

function escapeHtml(value = "") {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export async function sendContactRequest(data: ContactInput) {
  if (process.env.EMAIL_PROVIDER !== "resend") {
    console.info("Contact request received", {
      requestType: data.requestType,
      company: data.company,
      email: "[redacted]",
    });
    return { accepted: true, simulated: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is missing.");

  const resend = new Resend(apiKey);
  const recipient = process.env.CONTACT_EMAIL || "contact@un1qpen.fr";
  const from = process.env.EMAIL_FROM || "Un1qpen <site@un1qpen.com>";
  const requestType = requestLabels[data.requestType] || data.requestType;
  const fullName = `${data.firstName} ${data.lastName}`;
  const rows = [
    ["Nom", fullName],
    ["Société", data.company],
    ["Fonction", data.role],
    ["E-mail", data.email],
    ["Téléphone", data.phone || "Non renseigné"],
    ["Pays", data.country],
    ["Type de demande", requestType],
    ["Volume estimatif", data.volume || "Non renseigné"],
  ];

  const { data: sent, error } = await resend.emails.send({
    from,
    to: recipient,
    replyTo: data.email,
    subject: `[Un1qpen] ${requestType} — ${data.company}`,
    text: `${rows.map(([label, value]) => `${label} : ${value}`).join("\n")}\n\nMessage :\n${data.message}`,
    html: `<div style="font-family:Arial,sans-serif;color:#1d1d1f;line-height:1.6">
      <h1 style="font-size:24px">Nouvelle demande Un1qpen</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows.map(([label, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #ddd;color:#555">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #ddd"><strong>${escapeHtml(value)}</strong></td></tr>`).join("")}
      </table>
      <h2 style="margin-top:28px;font-size:18px">Message</h2>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>`,
  });

  if (error) throw new Error(`Resend delivery failed: ${error.message}`);

  const acknowledgement = await resend.emails.send({
    from,
    to: data.email,
    replyTo: recipient,
    subject: "Nous avons bien reçu votre demande — Un1qpen",
    text: `Bonjour ${data.firstName},\n\nVotre demande a bien été transmise à l’équipe Un1qpen. Nous reviendrons vers vous prochainement.\n\nPlus de solutions, moins de pollution.\nUn1qpen`,
    html: `<div style="font-family:Arial,sans-serif;color:#1d1d1f;line-height:1.7">
      <p>Bonjour ${escapeHtml(data.firstName)},</p>
      <p>Votre demande a bien été transmise à l’équipe Un1qpen. Nous reviendrons vers vous prochainement.</p>
      <p style="margin-top:28px;color:#17486a"><strong>Plus de solutions, moins de pollution.</strong></p>
      <p>Un1qpen</p>
    </div>`,
  });

  if (acknowledgement.error) {
    console.error("Contact acknowledgement failed", acknowledgement.error);
  }

  return { accepted: true, id: sent?.id };
}
