import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  is_deleted: boolean("is_deleted").default(false),
});

// Personal Information
export const personalInfo = pgTable("personal_info", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location").notNull(),
  profileImage: text("profile_image"),
  resumeUrl: text("resume_url"),
  availability: text("availability").notNull().default("available"), // available, busy, unavailable
  availabilityMessage: text("availability_message"),
  is_deleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Categories for organizing content
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color").default("#6b7280"),
  icon: text("icon"),
  type: text("type").notNull(), // project, skill, blog, course, etc.
  is_deleted: boolean("is_deleted").default(false),
});

// Skills and Technologies
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  proficiency: integer("proficiency").notNull().default(1), // 1-10 scale
  categoryId: integer("category_id").references(() => categories.id),
  yearsExperience: decimal("years_experience", { precision: 3, scale: 1 }),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  is_deleted: boolean("is_deleted").default(false),
});

// Education
export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  field: text("field").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"), // null for ongoing
  grade: text("grade"),
  description: text("description"),
  achievements: text("achievements").array(),
  location: text("location"),
  isCurrent: boolean("is_current").default(false),
  is_deleted: boolean("is_deleted").default(false),
});

// Certifications
export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  issueDate: text("issue_date").notNull(),
  expiryDate: text("expiry_date"),
  credentialId: text("credential_id"),
  credentialUrl: text("credential_url"),
  description: text("description"),
  skills: text("skills").array(),
  isActive: boolean("is_active").default(true),
  is_deleted: boolean("is_deleted").default(false),
});

// Extended Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  image: text("image").notNull(),
  images: text("images").array(), // multiple images
  technologies: text("technologies").array().notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  featured: boolean("featured").default(false),
  status: text("status").notNull().default("completed"), // planning, in-progress, completed, paused
  categoryId: integer("category_id").references(() => categories.id),
  startDate: text("start_date"),
  endDate: text("end_date"),
  teamSize: integer("team_size").default(1),
  role: text("role"),
  challenges: text("challenges").array(),
  learnings: text("learnings").array(),
  metrics: jsonb("metrics"), // performance metrics, user counts, etc.
  order: integer("order").default(0),
  is_deleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Courses and Learning
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  instructor: text("instructor").notNull(),
  platform: text("platform").notNull(),
  url: text("url"),
  description: text("description"),
  status: text("status").notNull(), // enrolled, in-progress, completed, paused
  progress: integer("progress").default(0), // 0-100
  rating: integer("rating").default(0), // 1-5
  startDate: text("start_date"),
  completedDate: text("completed_date"),
  certificateUrl: text("certificate_url"),
  skills: text("skills").array(),
  notes: text("notes"),
  featured: boolean("featured").default(false),
  categoryId: integer("category_id").references(() => categories.id),
  is_deleted: boolean("is_deleted").default(false),
});

// Enhanced Books table
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  isbn: text("isbn"),
  image: text("image").notNull(),
  rating: integer("rating").default(0),
  status: text("status").notNull(), // 'currently-reading', 'want-to-read', 'completed', 'paused'
  progress: integer("progress").default(0), // percentage for currently reading
  startDate: text("start_date"),
  completedDate: text("completed_date"),
  notes: text("notes"),
  quotes: text("quotes").array(),
  tags: text("tags").array(),
  recommendedBy: text("recommended_by"),
  genre: text("genre"),
  pages: integer("pages"),
  featured: boolean("featured").default(false),
  is_deleted: boolean("is_deleted").default(false),
});

// Blog Posts/Articles
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  categoryId: integer("category_id").references(() => categories.id),
  tags: text("tags").array(),
  readTime: integer("read_time"), // estimated read time in minutes
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  featured: boolean("featured").default(false),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  is_deleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Social Links
export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // linkedin, github, twitter, etc.
  url: text("url").notNull(),
  username: text("username"),
  displayName: text("display_name"),
  icon: text("icon"),
  color: text("color"),
  active: boolean("active").default(true),
  order: integer("order").default(0),
  is_deleted: boolean("is_deleted").default(false),
});

// Work Experience (enhanced)
export const workExperience = pgTable("work_experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  department: text("department"),
  location: text("location").notNull(),
  workType: text("work_type").default("full-time"), // full-time, part-time, contract, freelance
  remote: boolean("remote").default(false),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"), // null for current position
  description: text("description").notNull(),
  achievements: text("achievements").array().notNull(),
  technologies: text("technologies").array().notNull(),
  projects: text("projects").array(),
  teamSize: integer("team_size"),
  reportingTo: text("reporting_to"),
  salary: text("salary"), // optional, encrypted
  companyWebsite: text("company_website"),
  companyLogo: text("company_logo"),
  isCurrent: boolean("is_current").default(false),
  order: integer("order").default(0),
  is_deleted: boolean("is_deleted").default(false),
});

// Achievements/Awards
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  issuer: text("issuer"),
  date: text("date").notNull(),
  category: text("category"), // award, recognition, milestone, etc.
  url: text("url"),
  image: text("image"),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  is_deleted: boolean("is_deleted").default(false),
});

// Testimonials/Recommendations
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  avatar: text("avatar"),
  linkedinUrl: text("linkedin_url"),
  email: text("email"),
  relationship: text("relationship"), // colleague, manager, client, etc.
  date: text("date"),
  featured: boolean("featured").default(false),
  approved: boolean("approved").default(false),
  order: integer("order").default(0),
  is_deleted: boolean("is_deleted").default(false),
});

// Contact Messages (enhanced)
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  phone: text("phone"),
  company: text("company"),
  projectType: text("project_type"), // consultation, project, collaboration, etc.
  budget: text("budget"),
  timeline: text("timeline"),
  source: text("source"), // how they found you
  status: text("status").default("new"), // new, read, replied, archived
  priority: text("priority").default("normal"), // low, normal, high
  tags: text("tags").array(),
  notes: text("notes"), // internal notes
  replied: boolean("replied").default(false),
  repliedAt: timestamp("replied_at"),
  is_deleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Analytics/Metrics
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  event: text("event").notNull(), // page_view, project_view, contact_form, etc.
  page: text("page"),
  data: jsonb("data"),
  userAgent: text("user_agent"),
  ip: text("ip"),
  country: text("country"),
  city: text("city"),
  referrer: text("referrer"),
  sessionId: text("session_id"),
  is_deleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Settings/Configuration
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  type: text("type").default("string"), // string, number, boolean, json
  description: text("description"),
  category: text("category").default("general"),
  is_deleted: boolean("is_deleted").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create Zod schemas for validation
export const insertPersonalInfoSchema = createInsertSchema(personalInfo).omit({
  id: true,
  is_deleted: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  is_deleted: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  is_deleted: true,
});

export const insertEducationSchema = createInsertSchema(education).omit({
  id: true,
  is_deleted: true,
});

export const insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  is_deleted: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  is_deleted: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  is_deleted: true,
});

export const insertBookSchema = createInsertSchema(books).omit({
  id: true,
  is_deleted: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  is_deleted: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({
  id: true,
  is_deleted: true,
});

export const insertWorkExperienceSchema = createInsertSchema(workExperience).omit({
  id: true,
  is_deleted: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  is_deleted: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  is_deleted: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  is_deleted: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  is_deleted: true,
  createdAt: true,
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  is_deleted: true,
  updatedAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  is_deleted: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPersonalInfo = z.infer<typeof insertPersonalInfoSchema>;
export type PersonalInfo = typeof personalInfo.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type Education = typeof education.$inferSelect;

export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type Certification = typeof certifications.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;

export type InsertWorkExperience = z.infer<typeof insertWorkExperienceSchema>;
export type WorkExperience = typeof workExperience.$inferSelect;

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;

export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;
