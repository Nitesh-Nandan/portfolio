import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { eq, desc } from 'drizzle-orm';
import { db } from './db';
import { personalInfo, workExperience, projects, skills, books, courses, articles } from '@shared/schema';
import type { PersonalInfo, WorkExperience, Project, Skill, Book, Course, Article } from '@shared/schema';

class DataService {
  private dataPath = join(dirname(fileURLToPath(import.meta.url)), 'data');
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

  // === PERSONAL INFO ===
  async getPersonalInfo(): Promise<PersonalInfo> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(personalInfo).limit(1);
        return result[0] || null;
      },
      'personal-info.json',
      {
        id: 1,
        firstName: '',
        lastName: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        location: '',
        profileImage: '',
        resumeUrl: '',
        availability: 'available',
        availabilityMessage: '',
        updatedAt: new Date()
      } as PersonalInfo
    ) as Promise<PersonalInfo>;
  }

  async updatePersonalInfo(data: Partial<PersonalInfo>): Promise<void> {
    try {
      // Update database
      await db.update(personalInfo).set(data).where(eq(personalInfo.id, 1));
      
      // Update JSON file
      const current = await this.readJsonFile('personal-info.json', {});
      const updated = { ...current, ...data };
      writeFileSync(join(this.dataPath, 'personal-info.json'), JSON.stringify(updated, null, 2));
      
      // Clear cache
      this.cache.delete('personal-info.json');
    } catch (error) {
      console.error('Error updating personal info:', error);
      throw error;
    }
  }

  // === WORK EXPERIENCE ===
  async getWorkExperience(): Promise<WorkExperience[]> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(workExperience).orderBy(desc(workExperience.order));
        return result;
      },
      'work-experience.json',
      []
    ) as Promise<WorkExperience[]>;
  }

  // === PROJECTS ===
  async getProjects(): Promise<Project[]> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(projects).orderBy(desc(projects.order));
        return result;
      },
      'projects.json',
      []
    ) as Promise<Project[]>;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const allProjects = await this.getProjects();
    return Array.isArray(allProjects) ? allProjects.filter(p => p.featured) : [];
  }

  // === SKILLS ===
  async getSkills(): Promise<Skill[]> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(skills).orderBy(desc(skills.order));
        return result;
      },
      'skills.json',
      []
    ) as Promise<Skill[]>;
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    const allSkills = await this.getSkills();
    return Array.isArray(allSkills) ? allSkills.filter(s => s.category === category) : [];
  }

  // === BOOKS ===
  async getBooks(): Promise<Book[]> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(books);
        return result;
      },
      'books.json',
      []
    ) as Promise<Book[]>;
  }

  async getBooksByStatus(status: string): Promise<Book[]> {
    const allBooks = await this.getBooks();
    return Array.isArray(allBooks) ? allBooks.filter(b => b.status === status) : [];
  }

  // === COURSES ===
  async getCourses(): Promise<Course[]> {
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(courses).orderBy(desc(courses.order));
        return result;
      },
      'courses.json',
      []
    ) as Promise<Course[]>;
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
    return this.getFromDbWithFallback(
      async () => {
        const result = await db.select().from(articles).orderBy(desc(articles.order));
        return result;
      },
      'articles.json',
      []
    ) as Promise<Article[]>;
  }

  async getArticlesByStatus(status: string): Promise<Article[]> {
    const allArticles = await this.getArticles();
    return Array.isArray(allArticles) ? allArticles.filter(a => a.status === status) : [];
  }

  async getFeaturedArticles(): Promise<Article[]> {
    const allArticles = await this.getArticles();
    return Array.isArray(allArticles) ? allArticles.filter(a => a.featured) : [];
  }

  // === SYNC METHODS ===
  async syncToDatabase(): Promise<void> {
    try {
      console.log('Syncing local data to database...');
      
      // Sync personal info - simple upsert logic
      const personalData = await this.readJsonFile('personal-info.json', {}) as PersonalInfo;
      if (personalData && Object.keys(personalData).length > 0 && personalData.id) {
        const existing = await db.select().from(personalInfo).where(eq(personalInfo.id, personalData.id));
        if (existing.length > 0) {
          await db.update(personalInfo).set(personalData).where(eq(personalInfo.id, personalData.id));
        } else {
          await db.insert(personalInfo).values(personalData);
        }
        console.log('✅ Personal info synced');
      }

      // Sync work experience
      const workData = await this.readJsonFile('work-experience.json', []) as WorkExperience[];
      if (Array.isArray(workData) && workData.length > 0) {
        // Clear existing data and insert fresh data
        await db.delete(workExperience);
        await db.insert(workExperience).values(workData);
        console.log(`✅ Work experience synced (${workData.length} records)`);
      }

      // Sync projects
      const projectData = await this.readJsonFile('projects.json', []) as Project[];
      if (Array.isArray(projectData) && projectData.length > 0) {
        await db.delete(projects);
        await db.insert(projects).values(projectData);
        console.log(`✅ Projects synced (${projectData.length} records)`);
      }

      // Sync skills
      const skillData = await this.readJsonFile('skills.json', []) as Skill[];
      if (Array.isArray(skillData) && skillData.length > 0) {
        await db.delete(skills);
        await db.insert(skills).values(skillData);
        console.log(`✅ Skills synced (${skillData.length} records)`);
      }

      // Sync books
      const bookData = await this.readJsonFile('books.json', []) as Book[];
      if (Array.isArray(bookData) && bookData.length > 0) {
        await db.delete(books);
        await db.insert(books).values(bookData);
        console.log(`✅ Books synced (${bookData.length} records)`);
      }

      // Sync courses
      const courseData = await this.readJsonFile('courses.json', []) as Course[];
      if (Array.isArray(courseData) && courseData.length > 0) {
        await db.delete(courses);
        await db.insert(courses).values(courseData);
        console.log(`✅ Courses synced (${courseData.length} records)`);
      }

      // Sync articles
      const articleData = await this.readJsonFile('articles.json', []) as Article[];
      if (Array.isArray(articleData) && articleData.length > 0) {
        await db.delete(articles);
        await db.insert(articles).values(articleData);
        console.log(`✅ Articles synced (${articleData.length} records)`);
      }
      
      console.log('Database sync completed');
    } catch (error) {
      console.error('Database sync failed:', error);
    }
  }

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

      console.log('JSON backup completed');
    } catch (error) {
      console.error('JSON backup failed:', error);
    }
  }
}

export const dataService = new DataService(); 