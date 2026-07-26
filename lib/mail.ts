import type { ContactInput } from "./validations";
export async function sendContactRequest(data: ContactInput) {
  if (process.env.EMAIL_PROVIDER === "console") console.info("Contact request received", { ...data, email: "[redacted]" });
  return { accepted: true };
}
