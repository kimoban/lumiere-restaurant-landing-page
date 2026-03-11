function parseJSONEnv<T>(key: string): T | undefined {
  const raw = process.env[key];
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

const USD_TO_GHS = 15.5;

function toCedis(usdPrice: number) {
  return Math.round((usdPrice * USD_TO_GHS) / 5) * 5;
}

export default async function handler(_req: any, res: any) {
  const envExperience = parseJSONEnv<any>("TASTING_EXPERIENCE_JSON");
  if (envExperience) {
    return res.status(200).json(envExperience);
  }

  const tastingExperience = {
    title: "Chef's Tasting",
    subtitle: "A seasonal progression built around the Atlantic catch, Central Region produce, and Lumiere's quiet, fire-led kitchen.",
    experienceName: "Six-Course Coastal Tasting",
    description:
      "Designed for lingering evenings, the tasting menu moves from bright shellfish and market herbs into richer coastal mains before closing with Ghana cocoa and tropical fruit.",
    price: toCedis(72),
    serviceWindow: "Offered Thursday to Sunday from 6:30 PM with optional wine pairing.",
    availabilityNote: "Limited to 18 tasting menus each evening. Advance reservation recommended.",
    winePairingNote: "Optional three-glass pairing curated around citrus, minerality, and spice.",
    ctaLabel: "Reserve the Tasting",
    courses: [
      {
        course: "Course 1",
        title: "Sobolo Oyster",
        description: "Atlantic oyster, chilled sobolo granita, lime leaf oil.",
      },
      {
        course: "Course 2",
        title: "Market Prawn Broth",
        description: "Light shellfish broth with ginger, herbs, and smoked chili.",
      },
      {
        course: "Course 3",
        title: "Charred Octopus Suya",
        description: "Wood-fired octopus with sweet plantain and herb relish.",
      },
      {
        course: "Course 4",
        title: "Fanti Catch",
        description: "Line-caught fish, coconut emulsion, kontomire greens, crisp banku crumb.",
      },
      {
        course: "Course 5",
        title: "Fire-Roasted Guinea Fowl",
        description: "Spiced jus, grilled garden vegetables, and tamarind glaze.",
      },
      {
        course: "Course 6",
        title: "Cocoa Cloud",
        description: "Warm cocoa mousse, sea salt caramel, and roasted pineapple cream.",
      },
    ],
  };

  res.status(200).json(tastingExperience);
}