import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertWorkExperienceSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get featured projects
  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  // Get all books
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  // Get books by status
  app.get("/api/books/:status", async (req, res) => {
    try {
      const { status } = req.params;
      const books = await storage.getBooksByStatus(status);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books by status" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Get work experience
  app.get("/api/work-experience", async (req, res) => {
    try {
      const experiences = await storage.getWorkExperience();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch work experience" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
