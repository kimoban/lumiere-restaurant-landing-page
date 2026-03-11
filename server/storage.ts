import {
  type MenuItem,
  type EventDetails,
  type Story,
  type TastingExperience,
  type SocialProof,
} from "../shared/schema";

const USD_TO_GHS = 15.5;

function toCedis(usdPrice: number) {
  return Math.round((usdPrice * USD_TO_GHS) / 5) * 5;
}

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  getEventDetails(): Promise<EventDetails>;
  getStory(): Promise<Story>;
  getTastingExperience(): Promise<TastingExperience>;
  getSocialProof(): Promise<SocialProof>;
}

export class MemStorage implements IStorage {
  private menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Sekondi Sea Scallops",
      description: "Seared scallops, coconut-citrus butter, grilled kontomire oil",
      price: toCedis(26),
      category: "appetizer",
      imageUrl: "/assets/generated_images/Seared_scallops_signature_dish_22aa565e.png",
    },
    {
      id: "2",
      name: "Atlantic Oysters on Ice",
      description: "Chilled oysters, sobolo mignonette, lime, sea salt",
      price: toCedis(22),
      category: "appetizer",
      imageUrl: "/assets/generated_images/Oysters_appetizer_dish_c78a41ea.png",
    },
    {
      id: "3",
      name: "Charred Octopus Suya",
      description: "Wood-grilled octopus, smoked suya spice, sweet potato, herb sauce",
      price: toCedis(30),
      category: "appetizer",
      imageUrl: "/assets/generated_images/Grilled_octopus_signature_dish_7290cf5f.png",
    },
    {
      id: "4",
      name: "Coastal Jollof Lobster",
      description: "Butter-poached lobster, smoky jollof rice, charred peppers, herb jus",
      price: toCedis(48),
      category: "entree",
      imageUrl: "/assets/generated_images/Wagyu_steak_signature_dish_cf081c50.png",
    },
    {
      id: "5",
      name: "Fanti Catch with Banku Crumble",
      description: "Market fish, pepper relish, banku crisp, garden herbs",
      price: toCedis(34),
      category: "entree",
      imageUrl: "/assets/generated_images/Pasta_carbonara_signature_dish_f547b1a1.png",
    },
    {
      id: "6",
      name: "Cocoa Souffle",
      description: "Ghana cocoa souffle, salted caramel, roasted pineapple cream",
      price: toCedis(16),
      category: "dessert",
      imageUrl: "/assets/generated_images/Chocolate_dessert_signature_dish_713c45e1.png",
    },
  ];

  private eventDetails: EventDetails = {
    name: "Lumière",
    tagline: "Coastal Fine Dining, Reimagined",
    dates: "Now welcoming guests for the 2026 dining season",
    times: "Lunch: 12:30 PM, Dinner: 6:30 PM",
    location: {
      name: "Lumière Dining Room",
      address: "Cape Coast",
      city: "Ghana, West Africa",
      coordinates: {
        lat: 5.1053,
        lng: -1.2466,
      },
    },
    seatingInfo: "Limited to 24 guests per seating. Reservations required.",
    parkingInfo: "On-site guest parking available. Local taxi and ride services offer convenient access across Cape Coast.",
    contactEmail: "reservations@lumierecapecoast.com",
    contactPhone: "+233 20 555 1234",
  };

  private story: Story = {
    title: "Rooted in Cape Coast",
    paragraphs: [
      "Lumière draws its identity from Cape Coast's shoreline, fishing harbours, and storied streets, translating familiar Ghanaian ingredients into a polished coastal dining experience. Each menu is shaped by what arrives fresh from the sea, the market, and nearby farms across the Central Region.",
      "The kitchen layers local character into every course, from sobolo-brightened shellfish to smoky pepper sauces, Ghana cocoa desserts, and seasonal produce prepared with a light, contemporary touch. The result is elegant without losing the warmth and generosity that define hospitality on the coast.",
      "Whether guests arrive from the castle district, the university quarter, or a weekend stay along the Atlantic, Lumière is designed to feel unmistakably Cape Coast: intimate, grounded, and memorable long after the last course.",
    ],
  };

  private tastingExperience: TastingExperience = {
    title: "Chef's Tasting",
    subtitle:
      "A seasonal progression built around the Atlantic catch, Central Region produce, and Lumiere's quiet, fire-led kitchen.",
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

  private socialProof: SocialProof = {
    title: "Guests and Press",
    subtitle:
      "A few of the voices that describe Lumiere best: quietly elegant, deeply coastal, and worth returning to.",
    reviewSummary:
      "Recommended by returning guests for anniversary dinners, hosted evenings, and Cape Coast weekend reservations.",
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

  async getMenuItems(): Promise<MenuItem[]> {
    return this.menuItems;
  }

  async getEventDetails(): Promise<EventDetails> {
    return this.eventDetails;
  }

  async getStory(): Promise<Story> {
    return this.story;
  }

  async getTastingExperience(): Promise<TastingExperience> {
    return this.tastingExperience;
  }

  async getSocialProof(): Promise<SocialProof> {
    return this.socialProof;
  }
}

export const storage = new MemStorage();
