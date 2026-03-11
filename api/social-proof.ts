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
  const envSocialProof = parseJSONEnv<any>("SOCIAL_PROOF_JSON");
  if (envSocialProof) {
    return res.status(200).json(envSocialProof);
  }

  const socialProof = {
    title: "Guests and Press",
    subtitle: "A few of the voices that describe Lumiere best: quietly elegant, deeply coastal, and worth returning to.",
    reviewSummary: "Recommended by returning guests for anniversary dinners, hosted evenings, and Cape Coast weekend reservations.",
    testimonials: [
      {
        quote:
          "The tasting menu felt grounded in Cape Coast without ever becoming predictable. Every course had confidence and restraint.",
        guestName: "Adwoa Mensah",
        guestContext: "Anniversary dinner guest",
      },
      {
        quote:
          "Service was calm, informed, and precise. Lumiere feels like the kind of place you plan an evening around.",
        guestName: "Kojo Brew",
        guestContext: "Weekend dining guest",
      },
      {
        quote:
          "The room, the seafood, and the cocoa dessert all landed exactly where a fine dining experience should: memorable, not overstated.",
        guestName: "Esi Hammond",
        guestContext: "Private supper attendee",
      },
    ],
    pressMentions: ["Cape Coast Table", "The Coastal Edit", "Accra Weekend", "Ghana Fine Dining Guide"],
  };

  res.status(200).json(socialProof);
}