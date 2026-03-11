import { reservationRequestSchema } from "../shared/schema";
import { storage } from "../server/storage";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = reservationRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid reservation request" });
  }

  const reservation = await storage.createReservation(parsed.data);

  return res.status(201).json(reservation);
}