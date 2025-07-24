import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// === CORE TABLES ONLY ===

// Personal Information (single record)
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
  availability: text("availability").notNull().default("available"),
  availabilityMessage: text("availability_message"),
  updatedAt: timestamp("updated_at").defaultNow(),
  isDeleted: boolean("is_deleted").default(false),
});

// Work Experience
export const workExperience = pgTable("work_experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  location: text("location"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description"),
  achievements: text("achievements").array(),
  technologies: text("technologies").array(),
  projects: text("projects").array(),
  isCurrent: boolean("is_current").default(false),
  order: integer("order").default(0),
  isDeleted: boolean("is_deleted").default(false),
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").array().notNull(), // Changed to array of strings
  image: text("image").notNull(),
  technologies: text("technologies").array().notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  status: text("status").default("completed"),
  isDeleted: boolean("is_deleted").default(false),
});

// Skills
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // frontend, backend, tools, etc.
  proficiency: integer("proficiency").notNull().default(5), // 1-10 scale
  yearsExperience: integer("years_experience").default(0),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  isDeleted: boolean("is_deleted").default(false),
});

// Books/Learning
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  image: text("image"),
  status: text("status").notNull().default("want-to-read"), // reading, completed, want-to-read
  rating: integer("rating"),
  progress: integer("progress").default(0),
  startDate: text("start_date"),
  completedDate: text("completed_date"),
  notes: text("notes"),
  tags: text("tags").array(),
  featured: boolean("featured").default(false),
  isDeleted: boolean("is_deleted").default(false),
});

// Courses
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  instructor: text("instructor").notNull(),
  url: text("url"),
  status: text("status").notNull().default("enrolled"), // enrolled, learning, completed
  progress: integer("progress").default(0),
  rating: integer("rating"),
  startDate: text("start_date"),
  completedDate: text("completed_date"),
  notes: text("notes"),
  tags: text("tags").array(),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  isDeleted: boolean("is_deleted").default(false),
});

// Articles
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url"),
  author: text("author").notNull(),
  publishedDate: text("published_date"),
  readDate: text("read_date"),
  summary: text("summary"),
  tags: text("tags").array(),
  rating: integer("rating"),
  featured: boolean("featured").default(false),
  status: text("status").notNull().default("to-read"), // to-read, reading, completed
  order: integer("order").default(0),
  isDeleted: boolean("is_deleted").default(false),
});

// Contact Messages (simple)
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  phone: text("phone"),
  company: text("company"),
  createdAt: timestamp("created_at").defaultNow(),
  isDeleted: boolean("is_deleted").default(false),
});

// Contact Content
export const contactContent = pgTable("contact_content", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull(),
  subheading: text("subheading").notNull(),
  formTitle: text("form_title").notNull(),
  connectTitle: text("connect_title").notNull(),
  contactInfoTitle: text("contact_info_title").notNull(),
  statusMessage: text("status_message").notNull(),
  socialLinksJson: text("social_links_json").notNull(), // JSON string for social links
  isDeleted: boolean("is_deleted").default(false),
});

// Footer Content
export const footerContent = pgTable("footer_content", {
  id: serial("id").primaryKey(),
  quickLinksTitle: text("quick_links_title").notNull(),
  contactTitle: text("contact_title").notNull(),
  copyrightText: text("copyright_text").notNull(),
  quickLinksJson: text("quick_links_json").notNull(), // JSON string for quick links
  socialLinksJson: text("social_links_json").notNull(), // JSON string for social links
  isDeleted: boolean("is_deleted").default(false),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  avatar: text("avatar").notNull(),
  order: integer("order").default(0),
  isDeleted: boolean("is_deleted").default(false),
});



// === TYPE EXPORTS ===
export type PersonalInfo = typeof personalInfo.$inferSelect;
export type WorkExperience = typeof workExperience.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Book = typeof books.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type ContactContent = typeof contactContent.$inferSelect;
export type FooterContent = typeof footerContent.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;


export type InsertPersonalInfo = typeof personalInfo.$inferInsert;
export type InsertWorkExperience = typeof workExperience.$inferInsert;
export type InsertProject = typeof projects.$inferInsert;
export type InsertSkill = typeof skills.$inferInsert;
export type InsertBook = typeof books.$inferInsert;
export type InsertCourse = typeof courses.$inferInsert;
export type InsertArticle = typeof articles.$inferInsert;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
export type InsertContactContent = typeof contactContent.$inferInsert;
export type InsertFooterContent = typeof footerContent.$inferInsert;
export type InsertTestimonial = typeof testimonials.$inferInsert;


// === SIMPLE VALIDATION SCHEMAS ===
export const insertPersonalInfoSchema = createInsertSchema(personalInfo);
export const insertWorkExperienceSchema = createInsertSchema(workExperience);
export const insertProjectSchema = createInsertSchema(projects);
export const insertSkillSchema = createInsertSchema(skills);
export const insertBookSchema = createInsertSchema(books);
export const insertCourseSchema = createInsertSchema(courses);
export const insertArticleSchema = createInsertSchema(articles);
export const insertContactMessageSchema = createInsertSchema(contactMessages);
export const insertContactContentSchema = createInsertSchema(contactContent);
export const insertFooterContentSchema = createInsertSchema(footerContent);
export const insertTestimonialSchema = createInsertSchema(testimonials);


export const selectPersonalInfoSchema = createSelectSchema(personalInfo);
export const selectWorkExperienceSchema = createSelectSchema(workExperience);
export const selectProjectSchema = createSelectSchema(projects);
export const selectSkillSchema = createSelectSchema(skills);
export const selectBookSchema = createSelectSchema(books);
export const selectCourseSchema = createSelectSchema(courses);
export const selectArticleSchema = createSelectSchema(articles);
export const selectContactMessageSchema = createSelectSchema(contactMessages);
export const selectContactContentSchema = createSelectSchema(contactContent);
export const selectFooterContentSchema = createSelectSchema(footerContent);
export const selectTestimonialSchema = createSelectSchema(testimonials);


// === FRONTEND TYPES WITH PARSED JSON ===
export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  email?: string;
}

export interface QuickLink {
  label: string;
  path: string;
}

export interface ContactContentWithParsedJson extends Omit<ContactContent, 'socialLinksJson'> {
  socialLinks: SocialLinks;
}

export interface FooterContentWithParsedJson extends Omit<FooterContent, 'quickLinksJson' | 'socialLinksJson'> {
  quickLinks: QuickLink[];
  socialLinks: SocialLinks;
}

export interface PersonalInfoWithParsedBio extends Omit<PersonalInfo, 'bio'> {
  bio: string[];
}
