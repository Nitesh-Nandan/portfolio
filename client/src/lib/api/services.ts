import { httpClient } from './http-client';
import { apiConfig } from './config';
import type { 
  PersonalInfo, 
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
    return apiConfig.isStaticMode() ? endpoint : `/api${endpoint}`;
  }
}

/**
 * Personal Information Service
 */
export class PersonalInfoService extends BaseApiService {
  async getPersonalInfo(): Promise<PersonalInfo> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('personal-info.json')
      : this.makeRequest('/personal-info');
  }

  async updatePersonalInfo(data: Partial<PersonalInfo>): Promise<AdminActionResponse> {
    return this.makeRequest('/admin/personal-info', {
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
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('work-experience.json')
      : this.makeRequest('/work-experience');
  }
}

/**
 * Projects Service
 */
export class ProjectsService extends BaseApiService {
  async getProjects(): Promise<Project[]> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('projects.json')
      : this.makeRequest('/projects');
  }

  async getFeaturedProjects(): Promise<Project[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Project[]>('projects.json');
      return all.filter(p => p.featured);
    }
    return this.makeRequest('/projects/featured');
  }
}

/**
 * Skills Service
 */
export class SkillsService extends BaseApiService {
  async getSkills(): Promise<Skill[]> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('skills.json')
      : this.makeRequest('/skills');
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Skill[]>('skills.json');
      return all.filter(s => s.category === category);
    }
    return this.makeRequest(`/skills?category=${encodeURIComponent(category)}`);
  }
}

/**
 * Learning Service (Books, Courses, Articles)
 */
export class LearningService extends BaseApiService {
  // Books
  async getBooks(): Promise<Book[]> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('books.json')
      : this.makeRequest('/books');
  }

  async getBooksByStatus(status: string): Promise<Book[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Book[]>('books.json');
      return all.filter(b => b.status === status);
    }
    return this.makeRequest(`/books/${encodeURIComponent(status)}`);
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('courses.json')
      : this.makeRequest('/courses');
  }

  async getCoursesByStatus(status: string): Promise<Course[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Course[]>('courses.json');
      return all.filter(c => c.status === status);
    }
    return this.makeRequest(`/courses/${encodeURIComponent(status)}`);
  }

  async getFeaturedCourses(): Promise<Course[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Course[]>('courses.json');
      return all.filter(c => c.featured);
    }
    return this.makeRequest('/courses/featured');
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('articles.json')
      : this.makeRequest('/articles');
  }

  async getArticlesByStatus(status: string): Promise<Article[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Article[]>('articles.json');
      return all.filter(a => a.status === status);
    }
    return this.makeRequest(`/articles/${encodeURIComponent(status)}`);
  }

  async getFeaturedArticles(): Promise<Article[]> {
    if (apiConfig.isStaticMode()) {
      const all = await this.makeStaticRequest<Article[]>('articles.json');
      return all.filter(a => a.featured);
    }
    return this.makeRequest('/articles/featured');
  }
}

/**
 * Content Service (Contact, Footer, Testimonials)
 */
export class ContentService extends BaseApiService {
  async getContactContent(): Promise<ContactContentWithParsedJson> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('contact-content.json')
      : this.makeRequest('/contact-content');
  }

  async getFooterContent(): Promise<FooterContentWithParsedJson> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('footer-content.json')
      : this.makeRequest('/footer-content');
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return apiConfig.isStaticMode()
      ? this.makeStaticRequest('testimonials.json')
      : this.makeRequest('/testimonials');
  }

  async submitContact(data: ContactFormData): Promise<{ message: string }> {
    if (apiConfig.isStaticMode()) {
      // In static mode, just simulate success
      console.log('📧 Contact form submission (static mode):', data);
      return { message: 'Thank you for your message! I will get back to you soon.' };
    }
    return this.makeRequest('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
}

/**
 * Admin Service
 */
export class AdminService extends BaseApiService {
  async syncToDatabase(): Promise<AdminActionResponse> {
    return this.makeRequest('/admin/sync', { method: 'POST' });
  }

  async backupToJson(): Promise<AdminActionResponse> {
    return this.makeRequest('/admin/backup', { method: 'POST' });
  }
} 