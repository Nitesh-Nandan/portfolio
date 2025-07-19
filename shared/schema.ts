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
  isCurrent: boolean("is_current").default(false),
  order: integer("order").default(0),
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  technologies: text("technologies").array().notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  status: text("status").default("completed"),
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
});

// === TYPE EXPORTS ===
export type PersonalInfo = typeof personalInfo.$inferSelect;
export type WorkExperience = typeof workExperience.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Book = typeof books.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertPersonalInfo = typeof personalInfo.$inferInsert;
export type InsertWorkExperience = typeof workExperience.$inferInsert;
export type InsertProject = typeof projects.$inferInsert;
export type InsertSkill = typeof skills.$inferInsert;
export type InsertBook = typeof books.$inferInsert;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

// === SIMPLE VALIDATION SCHEMAS ===
export const insertPersonalInfoSchema = createInsertSchema(personalInfo);
export const insertWorkExperienceSchema = createInsertSchema(workExperience);
export const insertProjectSchema = createInsertSchema(projects);
export const insertSkillSchema = createInsertSchema(skills);
export const insertBookSchema = createInsertSchema(books);
export const insertContactMessageSchema = createInsertSchema(contactMessages);

export const selectPersonalInfoSchema = createSelectSchema(personalInfo);
export const selectWorkExperienceSchema = createSelectSchema(workExperience);
export const selectProjectSchema = createSelectSchema(projects);
export const selectSkillSchema = createSelectSchema(skills);
export const selectBookSchema = createSelectSchema(books);
export const selectContactMessageSchema = createSelectSchema(contactMessages);
