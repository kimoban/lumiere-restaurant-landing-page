import type { ReservationRequest } from "../shared/schema";
import { sendReservationNotification } from "./notifications";
import { storage } from "./storage";

export async function createReservationAndNotify(reservationRequest: ReservationRequest) {
  const reservation = await storage.createReservation(reservationRequest);

  try {
    await sendReservationNotification(reservation);
  } catch (error) {
    console.error("Failed to send reservation notification", error);
  }

  return reservation;
}