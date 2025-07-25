import { httpClient } from './http-client';
import { apiConfig } from './config';
import type { 
  PersonalInfo, 
  PersonalInfoWithParsedBio,
  WorkExperience, 
  Project, 
  Skill, 
  Book, 
  Course, 
  Article, 
  ContactContentWithParsedJson, 
  FooterContentWithParsedJson,
  Testimonial
} from '@shared/schema';
import type { RequestOptions } from './types';
import type { ContactFormData, AdminActionResponse } from './types';

/**
 * Base API Service with common functionality
 */
abstract class BaseApiService {
  protected async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return httpClient.request<T>(endpoint, options);
  }

  protected async makeStaticRequest<T>(file: string): Promise<T> {
    return httpClient.requestStatic<T>(file);
  }

  protected getRequestUrl(endpoint: string): string {
    if (apiConfig.isStaticMode()) {
      return endpoint;
    }
    // Add /api prefix and ensure proper path construction
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `/api/${cleanEndpoint}`;
  }

  /**
   * Filter out deleted items from arrays
   */
  protected filterDeletedItems<T extends { isDeleted?: boolean | null }>(items: T[]): T[] {
    return items.filter(item => !item.isDeleted);
  }
}

/**
 * Personal Information Service
 */
export class PersonalInfoService extends BaseApiService {
  async getPersonalInfo(): Promise<PersonalInfoWithParsedBio> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('personal-info.json')
      : this.makeRequest(this.getRequestUrl('/personal-info'));
  }

  async updatePersonalInfo(data: Partial<PersonalInfo>): Promise<AdminActionResponse> {
    return this.makeRequest(this.getRequestUrl('/admin/personal-info'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
}

/**
 * Work Experience Service
 */
export class WorkExperienceService extends BaseApiService {
  async getWorkExperience(): Promise<WorkExperience[]> {
    const data = apiConfig.isStaticMode()
      ? await this.makeStaticRequest<WorkExperience[]>('work-experience.json')
      : await this.makeRequest<WorkExperience[]>(this.getRequestUrl('/work-experience'));
    
    return this.filterDeletedItems(data);
  }
}

/**
 * Projects Service
 */
export class ProjectsService extends BaseApiService {
  async getProjects(): Promise<Project[]> {
    const data = apiConfig.isStaticMode()
      ? await this.makeStaticRequest<Project[]>('projects.json')
      : await this.makeRequest<Project[]>(this.getRequestUrl('/projects'));
    
    return this.filterDeletedItems(data);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Project[]>('projects.json');
      const filtered = this.filterDeletedItems(all);
      return filtered.filter(p => p.featured);
    }
    return this.makeRequest(this.getRequestUrl('/projects/featured'));
  }
}

/**
 * Skills Service
 */
export class SkillsService extends BaseApiService {
  async getSkills(): Promise<Skill[]> {
    const data = apiConfig.isStaticMode()
      ? await this.makeStaticRequest<Skill[]>('skills.json')
      : await this.makeRequest<Skill[]>(this.getRequestUrl('/skills'));
    
    return this.filterDeletedItems(data);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Skill[]>('skills.json');
      const filtered = this.filterDeletedItems(all);
      return filtered.filter(s => s.category === category);
    }
    return this.makeRequest(this.getRequestUrl(`/skills?category=${encodeURIComponent(category)}`));
  }
}

/**
 * Learning Service (Books, Courses, Articles)
 */
export class LearningService extends BaseApiService {
  // Books
  async getBooks(): Promise<Book[]> {
    const data = apiConfig.isStaticMode()
      ? await this.makeStaticRequest<Book[]>('books.json')
      : await this.makeRequest<Book[]>(this.getRequestUrl('/books'));
    
    return this.filterDeletedItems(data);
  }

  async getBooksByStatus(status: string): Promise<Book[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Book[]>('books.json');
      const filtered = this.filterDeletedItems(all);
      return filtered.filter(b => b.status === status);
    }
    return this.makeRequest(this.getRequestUrl(`/books/${encodeURIComponent(status)}`));
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    const data = apiConfig.isStaticMode()
      ? await this.makeStaticRequest<Course[]>('courses.json')
      : await this.makeRequest<Course[]>(this.getRequestUrl('/courses'));
    
    return this.filterDeletedItems(data);
  }

  async getCoursesByStatus(status: string): Promise<Course[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Course[]>('courses.json');
      const filtered = this.filterDeletedItems(all);
      return filtered.filter(c => c.status === status);
    }
    return this.makeRequest(this.getRequestUrl(`/courses/${encodeURIComponent(status)}`));
  }

  async getFeaturedCourses(): Promise<Course[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Course[]>('courses.json');
      const filtered = this.filterDeletedItems(all);
      return filtered.filter(c => c.featured);
    }
    return this.makeRequest(this.getRequestUrl('/courses/featured'));
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    const data = apiConfig.isStaticMode()
      ? await this.makeStaticRequest<Article[]>('articles.json')
      : await this.makeRequest<Article[]>(this.getRequestUrl('/articles'));
    
    return this.filterDeletedItems(data);
  }

  async getArticlesByStatus(status: string): Promise<Article[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Article[]>('articles.json');
      const filtered = this.filterDeletedItems(all);
      return filtered.filter(a => a.status === status);
    }
    return this.makeRequest(this.getRequestUrl(`/articles/${encodeURIComponent(status)}`));
  }

  async getFeaturedArticles(): Promise<Article[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Article[]>('articles.json');
      const filtered = this.filterDeletedItems(all);
      return filtered.filter(a => a.featured);
    }
    return this.makeRequest(this.getRequestUrl('/articles/featured'));
  }
}

/**
 * Content Service (Contact, Footer, Testimonials)
 */
export class ContentService extends BaseApiService {
  async getContactContent(): Promise<ContactContentWithParsedJson> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('contact-content.json')
      : this.makeRequest(this.getRequestUrl('/contact-content'));
  }

  async getFooterContent(): Promise<FooterContentWithParsedJson> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('footer-content.json')
      : this.makeRequest(this.getRequestUrl('/footer-content'));
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const data = apiConfig.isStaticMode()
      ? await this.makeStaticRequest<Testimonial[]>('testimonials.json')
      : await this.makeRequest<Testimonial[]>(this.getRequestUrl('/testimonials'));
    
    return this.filterDeletedItems(data);
  }

  async submitContact(data: ContactFormData): Promise<{ message: string }> {
    if (apiConfig.isStaticMode()) {
      // In static mode, just simulate success
      console.log('📧 Contact form submission (static mode):', data);
      this.makeRequest(`${apiConfig.getContactUrl()}/api/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_CONTACT_ACCESS_TOKEN}`
        },
        body: JSON.stringify(data),
        timeout: 30000, // 30 seconds timeout for external contact API
      } as RequestOptions);
      return { message: 'Thank you for your message! I will get back to you soon.' }; 
    }
    
    return this.makeRequest(this.getRequestUrl('/contact'), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.ACCESS_TOKEN}`
      },
      body: JSON.stringify(data),
      timeout: 30000, // 30 seconds timeout for contact API
    } as RequestOptions);
  }
}

/**
 * Admin Service
 */
export class AdminService extends BaseApiService {
  async syncToDatabase(): Promise<AdminActionResponse> {
    return this.makeRequest(this.getRequestUrl('/admin/sync-to-db'), {
      method: 'POST',
    });
  }

  async backupToJson(): Promise<AdminActionResponse> {
    return this.makeRequest(this.getRequestUrl('/admin/backup-to-json'), {
      method: 'POST',
    });
  }
} 