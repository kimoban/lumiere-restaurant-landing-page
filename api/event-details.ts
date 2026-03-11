function parseJSONEnv<T>(key: string): T | undefined {
  const raw = process.env[key];
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export default async function handler(_req: any, res: any) {
  const envDetails = parseJSONEnv<any>("EVENT_DETAILS_JSON");
  if (envDetails) {
    return res.status(200).json(envDetails);
  }

  const details = {
    name: "Lumière",
    tagline: "Coastal Fine Dining, Reimagined",
    dates: "Now welcoming guests for the 2026 dining season",
    times: "Lunch: 12:30 PM, Dinner: 6:30 PM",
    location: {
      name: "Lumière Dining Room",
      address: "Cape Coast",
      city: "Ghana, West Africa",
      coordinates: { lat: 5.1053, lng: -1.2466 },
    },
    openingHours: [
      { days: "Tuesday to Thursday", hours: "12:30 PM to 3:00 PM, 6:30 PM to 10:00 PM" },
      { days: "Friday to Saturday", hours: "12:30 PM to 3:30 PM, 6:30 PM to 11:00 PM" },
      { days: "Sunday", hours: "1:00 PM to 8:30 PM" },
      { days: "Monday", hours: "Closed" },
    ],
    seatingInfo: "Limited to 24 guests per seating. Reservations required.",
    parkingInfo: "On-site guest parking available. Local taxi and ride services offer convenient access across Cape Coast.",
    dressCode: "Smart elegant. Linen separates, relaxed tailoring, and evening footwear are welcome.",
    landmarkDirections: [
      "Five minutes from Cape Coast Castle and the old seafront road.",
      "Follow the ridge toward the historic district and look for the cream stone facade beside the palm courtyard.",
      "Guests arriving from UCC can expect a 15-minute drive outside peak traffic.",
    ],
    reservationSlots: ["12:30 PM", "1:00 PM", "6:30 PM", "7:15 PM", "8:00 PM", "8:45 PM"],
    contactEmail: "reservations@lumierecapecoast.com",
    contactPhone: "+233 20 555 1234",
  };

  res.status(200).json(details);
}
