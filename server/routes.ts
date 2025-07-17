import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, insertWorkExperienceSchema, insertPersonalInfoSchema,
  insertCategorySchema, insertSkillSchema, insertEducationSchema, insertCertificationSchema,
  insertProjectSchema, insertCourseSchema, insertBookSchema, insertBlogPostSchema, 
  insertSocialLinkSchema, insertAchievementSchema, insertTestimonialSchema, 
  insertAnalyticsSchema, insertSettingSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Personal Info Routes
  app.get("/api/personal-info", async (req, res) => {
    try {
      const info = await storage.getPersonalInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch personal info" });
    }
  });

  app.post("/api/personal-info", async (req, res) => {
    try {
      const validatedData = insertPersonalInfoSchema.parse(req.body);
      const info = await storage.createPersonalInfo(validatedData);
      res.json(info);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create personal info" });
      }
    }
  });

  app.put("/api/personal-info/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPersonalInfoSchema.partial().parse(req.body);
      const info = await storage.updatePersonalInfo(id, validatedData);
      res.json(info);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update personal info" });
      }
    }
  });

  // Category Routes
  app.get("/api/categories", async (req, res) => {
    try {
      const { type } = req.query;
      const categories = type 
        ? await storage.getCategoriesByType(type as string)
        : await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create category" });
      }
    }
  });

  app.put("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(id, validatedData);
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to update category" });
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteCategory(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Soft delete endpoint for categories
  app.patch("/api/categories/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteCategory(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete category" });
    }
  });

  // Skills Routes
  app.get("/api/skills", async (req, res) => {
    try {
      const { featured, categoryId } = req.query;
      let skills;
      
      if (featured === 'true') {
        skills = await storage.getFeaturedSkills();
      } else if (categoryId) {
        skills = await storage.getSkillsByCategory(parseInt(categoryId as string));
      } else {
        skills = await storage.getSkills();
      }
      
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.json(skill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create skill" });
      }
    }
  });

  app.put("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, validatedData);
      res.json(skill);
    } catch (error) {
      res.status(500).json({ message: "Failed to update skill" });
    }
  });

  app.delete("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteSkill(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });

  // Soft delete endpoint for skills
  app.patch("/api/skills/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteSkill(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete skill" });
    }
  });

  // Education Routes
  app.get("/api/education", async (req, res) => {
    try {
      const { current } = req.query;
      const education = current === 'true' 
        ? await storage.getCurrentEducation()
        : await storage.getEducation();
      res.json(education);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education" });
    }
  });

  app.post("/api/education", async (req, res) => {
    try {
      const validatedData = insertEducationSchema.parse(req.body);
      const education = await storage.createEducation(validatedData);
      res.json(education);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create education" });
      }
    }
  });

  app.put("/api/education/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertEducationSchema.partial().parse(req.body);
      const education = await storage.updateEducation(id, validatedData);
      res.json(education);
    } catch (error) {
      res.status(500).json({ message: "Failed to update education" });
    }
  });

  app.delete("/api/education/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteEducation(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete education" });
    }
  });

  // Soft delete endpoint for education
  app.patch("/api/education/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteEducation(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete education" });
    }
  });

  // Certification Routes
  app.get("/api/certifications", async (req, res) => {
    try {
      const { active } = req.query;
      const certifications = active === 'true' 
        ? await storage.getActiveCertifications()
        : await storage.getCertifications();
      res.json(certifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });

  app.post("/api/certifications", async (req, res) => {
    try {
      const validatedData = insertCertificationSchema.parse(req.body);
      const certification = await storage.createCertification(validatedData);
      res.json(certification);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create certification" });
      }
    }
  });

  // Enhanced Projects Routes
  app.get("/api/projects", async (req, res) => {
    try {
      const { featured, categoryId, status } = req.query;
      let projects;
      
      if (featured === 'true') {
        projects = await storage.getFeaturedProjects();
      } else if (categoryId) {
        projects = await storage.getProjectsByCategory(parseInt(categoryId as string));
      } else if (status) {
        projects = await storage.getProjectsByStatus(status as string);
      } else {
        projects = await storage.getProjects();
      }
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create project" });
      }
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProject(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Soft delete endpoint for projects
  app.patch("/api/projects/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteProject(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete project" });
    }
  });

  // Courses Routes
  app.get("/api/courses", async (req, res) => {
    try {
      const { featured, status } = req.query;
      let courses;
      
      if (featured === 'true') {
        courses = await storage.getFeaturedCourses();
      } else if (status) {
        courses = await storage.getCoursesByStatus(status as string);
      } else {
        courses = await storage.getCourses();
      }
      
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const validatedData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validatedData);
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create course" });
      }
    }
  });

  // Enhanced Books Routes
  app.get("/api/books", async (req, res) => {
    try {
      const { featured, status } = req.query;
      let books;
      
      if (featured === 'true') {
        books = await storage.getFeaturedBooks();
      } else if (status) {
        books = await storage.getBooksByStatus(status as string);
      } else {
        books = await storage.getBooks();
      }
      
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.get("/api/books/:status", async (req, res) => {
    try {
      const { status } = req.params;
      const books = await storage.getBooksByStatus(status);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books by status" });
    }
  });

  app.post("/api/books", async (req, res) => {
    try {
      const validatedData = insertBookSchema.parse(req.body);
      const book = await storage.createBook(validatedData);
      res.json(book);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create book" });
      }
    }
  });

  app.put("/api/books/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBookSchema.partial().parse(req.body);
      const book = await storage.updateBook(id, validatedData);
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to update book" });
    }
  });

  app.delete("/api/books/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBook(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete book" });
    }
  });

  // Soft delete endpoint for books
  app.patch("/api/books/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteBook(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete book" });
    }
  });

  // Blog Posts Routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const { published, featured } = req.query;
      let posts;
      
      if (published === 'true') {
        posts = await storage.getPublishedBlogPosts();
      } else if (featured === 'true') {
        posts = await storage.getFeaturedBlogPosts();
      } else {
        posts = await storage.getBlogPosts();
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create blog post" });
      }
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Soft delete endpoint for blog posts
  app.patch("/api/blog-posts/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteBlogPost(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete blog post" });
    }
  });

  // Social Links Routes
  app.get("/api/social-links", async (req, res) => {
    try {
      const { active } = req.query;
      const links = active === 'true' 
        ? await storage.getActiveSocialLinks()
        : await storage.getSocialLinks();
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch social links" });
    }
  });

  app.post("/api/social-links", async (req, res) => {
    try {
      const validatedData = insertSocialLinkSchema.parse(req.body);
      const link = await storage.createSocialLink(validatedData);
      res.json(link);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create social link" });
      }
    }
  });

  app.delete("/api/social-links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteSocialLink(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete social link" });
    }
  });

  // Soft delete endpoint for social links
  app.patch("/api/social-links/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteSocialLink(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete social link" });
    }
  });

  // Achievements Routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const { featured } = req.query;
      const achievements = featured === 'true' 
        ? await storage.getFeaturedAchievements()
        : await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.post("/api/achievements", async (req, res) => {
    try {
      const validatedData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(validatedData);
      res.json(achievement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create achievement" });
      }
    }
  });

  app.delete("/api/achievements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAchievement(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete achievement" });
    }
  });

  // Soft delete endpoint for achievements
  app.patch("/api/achievements/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteAchievement(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete achievement" });
    }
  });

  // Testimonials Routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { featured, approved } = req.query;
      let testimonials;
      
      if (featured === 'true') {
        testimonials = await storage.getFeaturedTestimonials();
      } else if (approved === 'true') {
        testimonials = await storage.getApprovedTestimonials();
      } else {
        testimonials = await storage.getTestimonials();
      }
      
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create testimonial" });
      }
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTestimonial(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Soft delete endpoint for testimonials
  app.patch("/api/testimonials/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteTestimonial(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete testimonial" });
    }
  });

  // Enhanced Contact Routes
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

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const { status } = req.query;
      const messages = status 
        ? await storage.getContactMessagesByStatus(status as string)
        : await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  app.put("/api/contact-messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertContactMessageSchema.partial().parse(req.body);
      const message = await storage.updateContactMessage(id, validatedData);
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contact message" });
    }
  });

  app.delete("/api/contact-messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteContactMessage(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contact message" });
    }
  });

  // Soft delete endpoint for contact messages
  app.patch("/api/contact-messages/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteContactMessage(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete contact message" });
    }
  });

  // Enhanced Work Experience Routes
  app.get("/api/work-experience", async (req, res) => {
    try {
      const { current } = req.query;
      const experiences = current === 'true' 
        ? await storage.getCurrentWorkExperience()
        : await storage.getWorkExperience();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch work experience" });
    }
  });

  app.post("/api/work-experience", async (req, res) => {
    try {
      const validatedData = insertWorkExperienceSchema.parse(req.body);
      const experience = await storage.createWorkExperience(validatedData);
      res.json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create work experience" });
      }
    }
  });

  app.put("/api/work-experience/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertWorkExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateWorkExperience(id, validatedData);
      res.json(experience);
    } catch (error) {
      res.status(500).json({ message: "Failed to update work experience" });
    }
  });

  app.delete("/api/work-experience/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteWorkExperience(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete work experience" });
    }
  });

  // Soft delete endpoint for work experience
  app.patch("/api/work-experience/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteWorkExperience(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete work experience" });
    }
  });

  // Analytics Routes
  app.post("/api/analytics", async (req, res) => {
    try {
      const validatedData = insertAnalyticsSchema.parse(req.body);
      const analytics = await storage.createAnalytics(validatedData);
      res.json(analytics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create analytics" });
      }
    }
  });

  app.get("/api/analytics", async (req, res) => {
    try {
      const { event, startDate, endDate } = req.query;
      let analytics;
      
      if (event) {
        analytics = await storage.getAnalyticsByEvent(event as string);
      } else {
        analytics = await storage.getAnalytics(startDate as string, endDate as string);
      }
      
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Settings Routes
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const setting = await storage.getSetting(key);
      if (!setting) {
        return res.status(404).json({ message: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch setting" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const validatedData = insertSettingSchema.parse(req.body);
      const setting = await storage.createSetting(validatedData);
      res.json(setting);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create setting" });
      }
    }
  });

  app.put("/api/settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      const setting = await storage.updateSetting(key, value);
      res.json(setting);
    } catch (error) {
      res.status(500).json({ message: "Failed to update setting" });
    }
  });

  app.delete("/api/settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const success = await storage.deleteSetting(key);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete setting" });
    }
  });

  // Soft delete endpoint for settings
  app.patch("/api/settings/:id/soft-delete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.softDeleteSetting(id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to soft delete setting" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
