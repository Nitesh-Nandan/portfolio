import { readFileSync } from 'fs';
import { join } from 'path';
import type { 
  PersonalInfo, WorkExperience, Project, Book, Skill, Category 
} from '@shared/schema';

class FallbackDataService {
  private dataPath = join(__dirname, 'data');
  private cache = new Map<string, { data: any, timestamp: number }>();
  private cacheTimeout = 300000; // 5 minutes

  private readDataFile<T>(filename: string): T {
    try {
      const now = Date.now();
      const cached = this.cache.get(filename);
      
      // Return cached if still valid
      if (cached && (now - cached.timestamp) < this.cacheTimeout) {
        return cached.data;
      }

      const filePath = join(this.dataPath, filename);
      const data = JSON.parse(readFileSync(filePath, 'utf-8'));
      
      // Cache the data
      this.cache.set(filename, { data, timestamp: now });
      return data;
    } catch (error) {
      console.error(`Failed to read fallback data file ${filename}:`, error);
      
      // If file read fails but we have cached data, use it
      const cached = this.cache.get(filename);
      if (cached) {
        console.warn(`Using expired cache for ${filename}`);
        return cached.data;
      }
      
      throw new Error(`Fallback data unavailable for ${filename}`);
    }
  }

  // Personal Info
  getPersonalInfo(): PersonalInfo {
    return this.readDataFile<PersonalInfo>('personal-info.json');
  }

  // Work Experience
  getWorkExperience(): WorkExperience[] {
    return this.readDataFile<WorkExperience[]>('work-experience.json');
  }

  getCurrentWorkExperience(): WorkExperience[] {
    const experiences = this.getWorkExperience();
    return experiences.filter(exp => exp.isCurrent);
  }

  // Books
  getBooks(): Book[] {
    return this.readDataFile<Book[]>('books.json');
  }

  getBooksByStatus(status: string): Book[] {
    const books = this.getBooks();
    return books.filter(book => book.status === status);
  }

  getFeaturedBooks(): Book[] {
    const books = this.getBooks();
    return books.filter(book => book.featured);
  }

  // Skills
  getSkills(): Skill[] {
    return this.readDataFile<Skill[]>('skills.json');
  }

  getFeaturedSkills(): Skill[] {
    const skills = this.getSkills();
    return skills.filter(skill => skill.featured);
  }

  getSkillsByCategory(categoryId: number): Skill[] {
    const skills = this.getSkills();
    return skills.filter(skill => skill.categoryId === categoryId);
  }

  // Categories
  getCategories(): Category[] {
    return this.readDataFile<Category[]>('categories.json');
  }

  getCategoriesByType(type: string): Category[] {
    const categories = this.getCategories();
    return categories.filter(category => category.type === type);
  }

  // Clear cache when needed
  clearCache(): void {
    this.cache.clear();
  }
}

export const fallbackData = new FallbackDataService(); 