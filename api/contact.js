import { assistantProfile } from "../src/data/profile-data.js";
import { sendContactMessage } from "../src/lib/contact-service.js";

function parseRequestBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    return JSON.parse(body);
  }

  return body;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const body = parseRequestBody(req.body);
    const payload = await sendContactMessage({
      email: body.email,
      message: body.message,
      resendApiKey: process.env.RESEND_API_KEY,
      contactToEmail: process.env.CONTACT_TO_EMAIL || assistantProfile.identity.email,
      contactFromEmail: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
    });

    res.status(200).json(payload);
  } catch (error) {
    if (typeof error?.status === "number") {
      res.status(error.status).json({ error: error.message });
      return;
    }

    console.error("Contact API error", error);
    res.status(500).json({ error: "Failed to send message." });
  }
}
