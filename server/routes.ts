import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { reservationRequestSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/menu", async (_req, res) => {
    try {
      const menuItems = await storage.getMenuItems();
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  app.get("/api/event-details", async (_req, res) => {
    try {
      const eventDetails = await storage.getEventDetails();
      res.json(eventDetails);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event details" });
    }
  });

  app.get("/api/story", async (_req, res) => {
    try {
      const story = await storage.getStory();
      res.json(story);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch story" });
    }
  });

  app.post("/api/reservations", async (req, res) => {
    const parsed = reservationRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid reservation request" });
    }

    try {
      const reservation = await storage.createReservation(parsed.data);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create reservation" });
    }
  });

  app.get("/api/tasting-experience", async (_req, res) => {
    try {
      const tastingExperience = await storage.getTastingExperience();
      res.json(tastingExperience);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasting experience" });
    }
  });

  app.get("/api/social-proof", async (_req, res) => {
    try {
      const socialProof = await storage.getSocialProof();
      res.json(socialProof);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch social proof" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
