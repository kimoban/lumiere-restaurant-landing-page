import type { Reservation } from "../shared/schema";

function buildReservationText(reservation: Reservation) {
  return [
    "A new reservation request was created.",
    "",
    `Reference: ${reservation.id}`,
    `Guest: ${reservation.guestName}`,
    `Email: ${reservation.guestEmail}`,
    `Date: ${reservation.date}`,
    `Time: ${reservation.time}`,
    `Party size: ${reservation.partySize}`,
    `Status: ${reservation.status}`,
    `Created at: ${reservation.createdAt}`,
  ].join("\n");
}

async function sendResendNotification(reservation: Reservation) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey || !adminEmail) {
    return false;
  }

  const fromEmail = process.env.RESERVATION_FROM_EMAIL || "Lumiere Reservations <reservations@lumierecapecoast.com>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [adminEmail],
      subject: `New reservation request ${reservation.id}`,
      text: buildReservationText(reservation),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend notification failed with ${response.status}`);
  }

  return true;
}

async function sendWebhookNotification(reservation: Reservation) {
  const webhookUrl = process.env.ADMIN_NOTIFICATION_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "reservation.created",
      reservation,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook notification failed with ${response.status}`);
  }

  return true;
}

export async function sendReservationNotification(reservation: Reservation) {
  const results = await Promise.allSettled([
    sendResendNotification(reservation),
    sendWebhookNotification(reservation),
  ]);

  const delivered = results.some(
    (result) => result.status === "fulfilled" && result.value,
  );

  if (!delivered) {
    const firstFailure = results.find((result) => result.status === "rejected");
    if (firstFailure && firstFailure.status === "rejected") {
      throw firstFailure.reason;
    }
  }

  return delivered;
}