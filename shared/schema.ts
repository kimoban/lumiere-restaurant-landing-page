import { z } from "zod";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(["appetizer", "entree", "dessert"]),
  imageUrl: z.string(),
});

export const openingHoursEntrySchema = z.object({
  days: z.string(),
  hours: z.string(),
});

export const reservationRequestSchema = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  date: z.string(),
  time: z.string(),
  partySize: z.string(),
});

export const reservationSchema = reservationRequestSchema.extend({
  id: z.string(),
  status: z.enum(["pending", "confirmed"]),
  createdAt: z.string(),
});

export const reservationsTable = pgTable("reservations", {
  id: varchar("id", { length: 32 }).primaryKey(),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  partySize: text("party_size").notNull(),
  status: varchar("status", { length: 16 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const eventDetailsSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  dates: z.string(),
  times: z.string(),
  location: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  openingHours: z.array(openingHoursEntrySchema),
  seatingInfo: z.string(),
  parkingInfo: z.string(),
  dressCode: z.string(),
  landmarkDirections: z.array(z.string()),
  reservationSlots: z.array(z.string()),
  contactEmail: z.string(),
  contactPhone: z.string(),
});

export const storySchema = z.object({
  title: z.string(),
  paragraphs: z.array(z.string()),
});

export const tastingCourseSchema = z.object({
  course: z.string(),
  title: z.string(),
  description: z.string(),
});

export const tastingExperienceSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  experienceName: z.string(),
  description: z.string(),
  price: z.number(),
  serviceWindow: z.string(),
  availabilityNote: z.string(),
  winePairingNote: z.string(),
  ctaLabel: z.string(),
  courses: z.array(tastingCourseSchema),
});

export const testimonialSchema = z.object({
  quote: z.string(),
  guestName: z.string(),
  guestContext: z.string(),
});

export const socialProofSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  reviewSummary: z.string(),
  testimonials: z.array(testimonialSchema),
  pressMentions: z.array(z.string()),
});

export type MenuItem = z.infer<typeof menuItemSchema>;
export type EventDetails = z.infer<typeof eventDetailsSchema>;
export type Story = z.infer<typeof storySchema>;
export type ReservationRequest = z.infer<typeof reservationRequestSchema>;
export type Reservation = z.infer<typeof reservationSchema>;
export type TastingCourse = z.infer<typeof tastingCourseSchema>;
export type TastingExperience = z.infer<typeof tastingExperienceSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type SocialProof = z.infer<typeof socialProofSchema>;
