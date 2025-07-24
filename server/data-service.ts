import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { eq, desc } from 'drizzle-orm';
import { db } from './db';
import { personalInfo, workExperience, projects, skills, books, courses, articles, testimonials, contactContent, footerContent, contactMessages } from '@shared/schema';
import type { PersonalInfo, WorkExperience, Project, Skill, Book, Course, Article, Testimonial, ContactContentWithParsedJson, FooterContentWithParsedJson, PersonalInfoWithParsedBio, ContactMessage, InsertContactMessage } from '@shared/schema';

class DataService {
  private dataPath = join(dirname(fileURLToPath(import.meta.url)), 'data/cache');
  private cache = new Map<string, { data: any, timestamp: number }>();
  private cacheTimeout = 300000; // 5 minutes

  // === CORE DATA METHODS ===

  private async readJsonFile<T>(filename: string, fallback: T[] | T): Promise<T[] | T> {
    try {
      const cached = this.cache.get(filename);
      const now = Date.now();
      
      if (cached && (now - cached.timestamp) < this.cacheTimeout) {
        return cached.data;
      }

      const filePath = join(this.dataPath, filename);
      if (!existsSync(filePath)) {
        console.warn(`File ${filename} doesn't exist, using fallback`);
        return fallback;
      }

      const data = JSON.parse(readFileSync(filePath, 'utf-8'));
      this.cache.set(filename, { data, timestamp: now });
      return data;
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      return fallback;
    }
  }

  private async getFromDbWithFallback<T>(
    dbQuery: () => Promise<T[] | T | null>,
    jsonFile: string,
    fallback: T[] | T
  ): Promise<T[] | T> {
    try {
      // Try database first
      const dbData = await dbQuery();
      if (dbData) {
        return dbData;
      }
    } catch (error) {
      console.error('Database error, falling back to JSON:', error);
    }

    // Fallback to JSON file
    return this.readJsonFile(jsonFile, fallback);
  }

  /**
   * Filter out deleted items from arrays
   */
  private filterDeletedItems<T extends { isDeleted?: boolean }>(items: T[]): T[] {
    return items.filter(item => !item.isDeleted);
  }

  // === PERSONAL INFO ===
  async getPersonalInfo(): Promise<PersonalInfoWithParsedBio> {
    // Try database first
    try {
      const dbResult = await db.select().from(personalInfo).limit(1);
      if (dbResult[0]) {
        const rawData = dbResult[0];
        // Parse bio from database (it's stored as JSON string)
        let bioArray: string[];
        try {
          bioArray = JSON.parse(rawData.bio);
        } catch {
          bioArray = [rawData.bio || ''];
        }
        
        // If the first element is also a JSON string, parse it again
        if (bioArray.length === 1 && typeof bioArray[0] === 'string') {
          try {
            const parsed = JSON.parse(bioArray[0]);
            if (Array.isArray(parsed)) {
              bioArray = parsed;
            }
          } catch {
            // Keep original if parsing fails
          }
        }
        
        return {
          ...rawData,
          bio: bioArray
        };
      }
    } catch (error) {
      console.error('Database error, falling back to JSON:', error);
    }

    // Fallback to JSON file (bio is already an array)
    const result = await this.readJsonFile('personal-info.json', {
      id: 1,
      firstName: '',
      lastName: '',
      title: '',
      bio: [''],
      email: '',
      phone: '',
      location: '',
      profileImage: '',
      resumeUrl: '',
      availability: 'available',
      availabilityMessage: '',
      updatedAt: new Date(),
      isDeleted: false
    } as PersonalInfoWithParsedBio);
    
    return result as PersonalInfoWithParsedBio;
  }

  async updatePersonalInfo(data: Partial<PersonalInfo>): Promise<void> {
    try {
      // Update in database
      await db.update(personalInfo)
        .set({
          ...data,
          updatedAt: new Date()
        })
        .where(eq(personalInfo.id, 1));
      
      console.log('✅ Personal info updated in database');
    } catch (error) {
      console.error('❌ Failed to update personal info in database:', error);
      throw error;
    }
  }

  // === WORK EXPERIENCE ===
  async getWorkExperience(): Promise<WorkExperience[]> {
    const data = await this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(workExperience)
          .where(eq(workExperience.isDeleted, false))
          .orderBy(desc(workExperience.order));
        return result;
      },
      'work-experience.json',
      []
    ) as Promise<WorkExperience[]>;
    
    // Filter deleted items from JSON data as well
    return Array.isArray(data) ? this.filterDeletedItems(data) : [];
  }

  // === PROJECTS ===
  async getProjects(): Promise<Project[]> {
    const data = await this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(projects)
          .where(eq(projects.isDeleted, false))
          .orderBy(desc(projects.order));
        return result;
      },
      'projects.json',
      []
    ) as Promise<Project[]>;
    
    // Filter deleted items from JSON data as well
    return Array.isArray(data) ? this.filterDeletedItems(data) : [];
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const allProjects = await this.getProjects();
    return Array.isArray(allProjects) ? allProjects.filter(p => p.featured) : [];
  }

  // === SKILLS ===
  async getSkills(): Promise<Skill[]> {
    const data = await this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(skills)
          .where(eq(skills.isDeleted, false))
          .orderBy(desc(skills.order));
        return result;
      },
      'skills.json',
      []
    ) as Promise<Skill[]>;
    
    // Filter deleted items from JSON data as well
    return Array.isArray(data) ? this.filterDeletedItems(data) : [];
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    const allSkills = await this.getSkills();
    return Array.isArray(allSkills) ? allSkills.filter(s => s.category === category) : [];
  }

  // === BOOKS ===
  async getBooks(): Promise<Book[]> {
    const data = await this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(books)
          .where(eq(books.isDeleted, false));
        return result;
      },
      'books.json',
      []
    ) as Promise<Book[]>;
    
    // Filter deleted items from JSON data as well
    return Array.isArray(data) ? this.filterDeletedItems(data) : [];
  }

  async getBooksByStatus(status: string): Promise<Book[]> {
    const allBooks = await this.getBooks();
    return Array.isArray(allBooks) ? allBooks.filter(b => b.status === status) : [];
  }

  // === COURSES ===
  async getCourses(): Promise<Course[]> {
    const data = await this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(courses)
          .where(eq(courses.isDeleted, false))
          .orderBy(desc(courses.order));
        return result;
      },
      'courses.json',
      []
    ) as Promise<Course[]>;
    
    // Filter deleted items from JSON data as well
    return Array.isArray(data) ? this.filterDeletedItems(data) : [];
  }

  async getCoursesByStatus(status: string): Promise<Course[]> {
    const allCourses = await this.getCourses();
    return Array.isArray(allCourses) ? allCourses.filter(c => c.status === status) : [];
  }

  async getFeaturedCourses(): Promise<Course[]> {
    const allCourses = await this.getCourses();
    return Array.isArray(allCourses) ? allCourses.filter(c => c.featured) : [];
  }

  // === ARTICLES ===
  async getArticles(): Promise<Article[]> {
    const data = await this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(articles)
          .where(eq(articles.isDeleted, false))
          .orderBy(desc(articles.order));
        return result;
      },
      'articles.json',
      []
    ) as Promise<Article[]>;
    
    // Filter deleted items from JSON data as well
    return Array.isArray(data) ? this.filterDeletedItems(data) : [];
  }

  async getArticlesByStatus(status: string): Promise<Article[]> {
    const allArticles = await this.getArticles();
    return Array.isArray(allArticles) ? allArticles.filter(a => a.status === status) : [];
  }

  async getFeaturedArticles(): Promise<Article[]> {
    const allArticles = await this.getArticles();
    return Array.isArray(allArticles) ? allArticles.filter(a => a.featured) : [];
  }

  // === TESTIMONIALS ===
  async getTestimonials(): Promise<Testimonial[]> {
    const data = await this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(testimonials)
          .where(eq(testimonials.isDeleted, false))
          .orderBy(desc(testimonials.order), desc(testimonials.id));
        return result;
      },
      'testimonials.json',
      []
    ) as Promise<Testimonial[]>;
    
    // Filter deleted items from JSON data as well
    return Array.isArray(data) ? this.filterDeletedItems(data) : [];
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    const allTestimonials = await this.getTestimonials();
    return Array.isArray(allTestimonials) ? allTestimonials.filter(t => !t.isDeleted) : [];
  }

  // === CONTACT CONTENT ===
  async getContactContent(): Promise<ContactContentWithParsedJson> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(contactContent).limit(1);
        if (result[0]) {
          // Parse the JSON string from database
          const dbData = result[0];
          return {
            ...dbData,
            socialLinks: JSON.parse(dbData.socialLinksJson)
          } as ContactContentWithParsedJson;
        }
        return null;
      },
      'contact-content.json',
      {
        id: 1,
        heading: 'Get In Touch',
        subheading: "I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and system design.",
        formTitle: 'Send me a message',
        connectTitle: 'Connect',
        contactInfoTitle: 'Get in touch',
        statusMessage: 'Feel free to reach out if you need my skills or have an exciting project to collaborate on.',
        socialLinks: {
          linkedin: '',
          github: '',
          email: ''
        }
      } as ContactContentWithParsedJson
    ) as Promise<ContactContentWithParsedJson>;
  }

  // === FOOTER CONTENT ===
  async getFooterContent(): Promise<FooterContentWithParsedJson> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(footerContent).limit(1);
        if (result[0]) {
          // Parse the JSON strings from database
          const dbData = result[0];
          return {
            ...dbData,
            quickLinks: JSON.parse(dbData.quickLinksJson),
            socialLinks: JSON.parse(dbData.socialLinksJson)
          } as FooterContentWithParsedJson;
        }
        return null;
      },
      'footer-content.json',
      {
        id: 1,
        quickLinksTitle: 'Quick Links',
        contactTitle: 'Get In Touch',
        copyrightText: 'All rights reserved.',
        quickLinks: [
          { label: 'Home', path: 'home' },
          { label: 'Projects', path: 'projects' },
          { label: 'Contact', path: 'contact' }
        ],
        socialLinks: {
          linkedin: '',
          github: '',
          email: ''
        },
        isDeleted: false
      } as FooterContentWithParsedJson
    ) as Promise<FooterContentWithParsedJson>;
  }

  // === CONTACT MESSAGES ===
  async submitContactMessage(data: InsertContactMessage): Promise<ContactMessage> {
    try {
      // Insert into database
      const [result] = await db.insert(contactMessages).values(data).returning();
      
      // Also save to JSON file for backup
      const contactMessagesPath = join(this.dataPath, 'contact-messages.json');
      let existingMessages: ContactMessage[] = [];
      
      try {
        if (existsSync(contactMessagesPath)) {
          existingMessages = JSON.parse(readFileSync(contactMessagesPath, 'utf-8'));
        }
      } catch (error) {
        console.warn('Could not read existing contact messages, starting fresh');
      }
      
      existingMessages.push(result);
      writeFileSync(contactMessagesPath, JSON.stringify(existingMessages, null, 2));
      
      // Clear cache
      this.cache.delete('contact-messages.json');
      
      return result;
    } catch (error) {
      console.error('Error submitting contact message:', error);
      throw error;
    }
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
        return result;
      },
      'contact-messages.json',
      []
    ) as Promise<ContactMessage[]>;
  }



  // === ADMIN/BACKUP METHODS ===

  async backupToJson(): Promise<void> {
    try {
      console.log('Backing up database to JSON files...');
      
      // Backup all data types
      const personalData = await db.select().from(personalInfo).limit(1);
      if (personalData[0]) {
        writeFileSync(
          join(this.dataPath, 'personal-info.json'),
          JSON.stringify(personalData[0], null, 2)
        );
      }

      const workData = await db.select().from(workExperience);
      writeFileSync(
        join(this.dataPath, 'work-experience.json'),
        JSON.stringify(workData, null, 2)
      );

      const projectData = await db.select().from(projects);
      writeFileSync(
        join(this.dataPath, 'projects.json'),
        JSON.stringify(projectData, null, 2)
      );

      const skillData = await db.select().from(skills);
      writeFileSync(
        join(this.dataPath, 'skills.json'),
        JSON.stringify(skillData, null, 2)
      );

      const bookData = await db.select().from(books);
      writeFileSync(
        join(this.dataPath, 'books.json'),
        JSON.stringify(bookData, null, 2)
      );

      const courseData = await db.select().from(courses);
      writeFileSync(
        join(this.dataPath, 'courses.json'),
        JSON.stringify(courseData, null, 2)
      );

      const articleData = await db.select().from(articles);
      writeFileSync(
        join(this.dataPath, 'articles.json'),
        JSON.stringify(articleData, null, 2)
      );

      // Backup contact messages
      const contactMessageData = await db.select().from(contactMessages);
      writeFileSync(
        join(this.dataPath, 'contact-messages.json'),
        JSON.stringify(contactMessageData, null, 2)
      );

      // Backup contact content
      const contactContentData = await db.select().from(contactContent).limit(1);
      if (contactContentData[0]) {
        const contactJsonData = {
          ...contactContentData[0],
          socialLinks: JSON.parse(contactContentData[0].socialLinksJson)
        };
        delete (contactJsonData as any).socialLinksJson; // Remove the raw JSON field
        
        writeFileSync(
          join(this.dataPath, 'contact-content.json'),
          JSON.stringify(contactJsonData, null, 2)
        );
      }

      // Backup footer content
      const footerContentData = await db.select().from(footerContent).limit(1);
      if (footerContentData[0]) {
        const footerJsonData = {
          ...footerContentData[0],
          quickLinks: JSON.parse(footerContentData[0].quickLinksJson),
          socialLinks: JSON.parse(footerContentData[0].socialLinksJson)
        };
        delete (footerJsonData as any).quickLinksJson; // Remove the raw JSON fields
        delete (footerJsonData as any).socialLinksJson;
        
        writeFileSync(
          join(this.dataPath, 'footer-content.json'),
          JSON.stringify(footerJsonData, null, 2)
        );
      }



      console.log('JSON backup completed');
    } catch (error) {
      console.error('JSON backup failed:', error);
    }
  }
}

export const dataService = new DataService(); 