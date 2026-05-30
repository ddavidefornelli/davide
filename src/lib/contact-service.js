function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const defaultContactFromEmail = "onboarding@resend.dev";

export async function sendContactMessage({
  email,
  message,
  resendApiKey,
  contactToEmail,
  contactFromEmail,
}) {
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedMessage = typeof message === "string" ? message.trim() : "";
  const resolvedContactFromEmail =
    typeof contactFromEmail === "string" && contactFromEmail.trim()
      ? contactFromEmail.trim()
      : defaultContactFromEmail;

  if (!trimmedEmail) {
    throw createHttpError(400, "Email is required.");
  }

  if (!isValidEmail(trimmedEmail)) {
    throw createHttpError(400, "Enter a valid email address.");
  }

  if (!trimmedMessage) {
    throw createHttpError(400, "Message is required.");
  }

  if (!resendApiKey) {
    throw createHttpError(503, "Contact form is not configured on the server.");
  }

  if (!contactToEmail) {
    throw createHttpError(503, "Destination email is not configured on the server.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resolvedContactFromEmail,
      to: [contactToEmail],
      reply_to: trimmedEmail,
      subject: `Portfolio contact from ${trimmedEmail}`,
      text: `From: ${trimmedEmail}\n\n${trimmedMessage}`,
      html: `<p><strong>From:</strong> ${escapeHtml(trimmedEmail)}</p><p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br />")}</p>`,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw createHttpError(response.status, payload.message || payload.error?.message || "Failed to send message.");
  }

  return {
    id: payload.id,
    ok: true,
  };
}
