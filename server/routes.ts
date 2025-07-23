import type { Express } from "express";
import { createServer, type Server } from "http";
import { dataService } from "./data-service";
import { syncData } from "./scripts/sync-db-data";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // === STATIC DATA ENDPOINTS (for client-side static mode) ===
  app.get("/data/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.resolve(import.meta.dirname, "data", filename);
      
      // Security check - only allow .json files and prevent directory traversal
      if (!filename.endsWith('.json') || filename.includes('..')) {
        return res.status(400).json({ message: "Invalid file request" });
      }
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Data file not found" });
      }
      
      // Read and serve the JSON file
      const data = await fs.promises.readFile(filePath, 'utf-8');
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    } catch (error) {
      console.error("Error serving static data:", error);
      res.status(500).json({ message: "Failed to serve static data" });
    }
  });

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

  // === COURSES ===
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dataService.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:status", async (req, res) => {
    try {
      const { status } = req.params;
      const courses = await dataService.getCoursesByStatus(status);
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses by status:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/featured", async (req, res) => {
    try {
      const courses = await dataService.getFeaturedCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching featured courses:", error);
      res.status(500).json({ message: "Failed to fetch featured courses" });
    }
  });

  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await dataService.getArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:status", async (req, res) => {
    try {
      const { status } = req.params;
      const articles = await dataService.getArticlesByStatus(status);
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles by status:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/featured", async (req, res) => {
    try {
      const articles = await dataService.getFeaturedArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });

  // Contact Content
  app.get("/api/contact-content", async (req, res) => {
    try {
      const contactContent = await dataService.getContactContent();
      res.json(contactContent);
    } catch (error) {
      console.error("Error fetching contact content:", error);
      res.status(500).json({ message: "Failed to fetch contact content" });
    }
  });

  // Footer Content
  app.get("/api/footer-content", async (req, res) => {
    try {
      const footerContent = await dataService.getFooterContent();
      res.json(footerContent);
    } catch (error) {
      console.error("Error fetching footer content:", error);
      res.status(500).json({ message: "Failed to fetch footer content" });
    }
  });



  // === ADMIN ENDPOINTS (for your personal use) ===

  // Sync data between JSON and database
  app.post("/api/admin/sync-to-db", async (req, res) => {
    try {
      await syncData();
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
