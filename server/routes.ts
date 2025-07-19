import type { Express } from "express";
import { createServer, type Server } from "http";
import { dataService } from "./data-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // === READ-ONLY API ENDPOINTS ===

  // Personal Info
  app.get("/api/personal-info", async (req, res) => {
    try {
      const info = await dataService.getPersonalInfo();
      res.json(info);
    } catch (error) {
      console.error("Error fetching personal info:", error);
      res.status(500).json({ message: "Failed to fetch personal info" });
    }
  });

  // Work Experience
  app.get("/api/work-experience", async (req, res) => {
    try {
      const experience = await dataService.getWorkExperience();
      res.json(experience);
    } catch (error) {
      console.error("Error fetching work experience:", error);
      res.status(500).json({ message: "Failed to fetch work experience" });
    }
  });

  // Projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await dataService.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await dataService.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  // Skills
  app.get("/api/skills", async (req, res) => {
    try {
      const { category } = req.query;
      const skills = category 
        ? await dataService.getSkillsByCategory(category as string)
        : await dataService.getSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Books
  app.get("/api/books", async (req, res) => {
    try {
      const books = await dataService.getBooks();
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.get("/api/books/:status", async (req, res) => {
    try {
      const { status } = req.params;
      const books = await dataService.getBooksByStatus(status);
      res.json(books);
    } catch (error) {
      console.error("Error fetching books by status:", error);
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  // === ADMIN ENDPOINTS (for your personal use) ===

  // Sync data between JSON and database
  app.post("/api/admin/sync-to-db", async (req, res) => {
    try {
      await dataService.syncToDatabase();
      res.json({ message: "Data synced to database successfully" });
    } catch (error) {
      console.error("Error syncing to database:", error);
      res.status(500).json({ message: "Failed to sync to database" });
    }
  });

  app.post("/api/admin/backup-to-json", async (req, res) => {
    try {
      await dataService.backupToJson();
      res.json({ message: "Data backed up to JSON files successfully" });
    } catch (error) {
      console.error("Error backing up to JSON:", error);
      res.status(500).json({ message: "Failed to backup to JSON" });
    }
  });

  // Simple update endpoint for personal info (since you're the only user)
  app.put("/api/admin/personal-info", async (req, res) => {
    try {
      await dataService.updatePersonalInfo(req.body);
      res.json({ message: "Personal info updated successfully" });
    } catch (error) {
      console.error("Error updating personal info:", error);
      res.status(500).json({ message: "Failed to update personal info" });
    }
  });

  return createServer(app);
}
