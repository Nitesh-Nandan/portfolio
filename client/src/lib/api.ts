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
import { config } from '@/config/env';

// Simple API configuration from environment variables
const getApiConfig = () => {
  const mode = import.meta.env.VITE_API_MODE || 'static';
  const baseUrl = config.api.baseUrl;
  const staticPath = import.meta.env.VITE_STATIC_DATA_PATH || '/data';
  
  // Debug logging
  console.log('🔍 API Configuration:', {
    VITE_API_MODE: mode,
    VITE_API_BASE_URL: baseUrl,
    VITE_STATIC_DATA_PATH: staticPath
  });
  
  return {
    mode: mode as 'static' | 'api',
    baseUrl: baseUrl.replace(/\/$/, ''), // Remove trailing slash
    staticPath: staticPath.replace(/\/$/, '') // Remove trailing slash
  };
};

// Simple fetch wrapper with error handling
const apiCall = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const apiConfig = getApiConfig();
  
  const url = apiConfig.baseUrl 
    ? new URL(endpoint, apiConfig.baseUrl).toString()
    : endpoint;
  
  try {
    console.log(`🌐 API Call: ${url}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
};

const staticApiCall = async <T>(file: string): Promise<T> => {
  const config = getApiConfig();
  const url = `${config.staticPath}/${file}`;
  
  try {
    console.log(`📁 Static Call: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Static Data Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch static data ${url}:`, error);
    throw error;
  }
};

// Simple API client based on environment variable
export const api = {
  // Personal Info
  getPersonalInfo: (): Promise<PersonalInfo> => {
    const config = getApiConfig();
    return config.mode === 'static' 
      ? staticApiCall('personal-info.json') 
      : apiCall('/api/personal-info');
  },

  // Work Experience  
  getWorkExperience: (): Promise<WorkExperience[]> => {
    const config = getApiConfig();
    return config.mode === 'static' 
      ? staticApiCall('work-experience.json') 
      : apiCall('/api/work-experience');
  },

  // Projects
  getProjects: (): Promise<Project[]> => {
    const config = getApiConfig();
    return config.mode === 'static' 
      ? staticApiCall('projects.json') 
      : apiCall('/api/projects');
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      const all = await staticApiCall<Project[]>('projects.json');
      return all.filter(p => p.featured);
    }
    return apiCall('/api/projects/featured');
  },

  // Skills
  getSkills: (): Promise<Skill[]> => {
    const config = getApiConfig();
    return config.mode === 'static' 
      ? staticApiCall('skills.json') 
      : apiCall('/api/skills');
  },

  getSkillsByCategory: async (category: string): Promise<Skill[]> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      const all = await staticApiCall<Skill[]>('skills.json');
      return all.filter(s => s.category === category);
    }
    return apiCall(`/api/skills?category=${encodeURIComponent(category)}`);
  },

  // Books/Learning
  getBooks: (): Promise<Book[]> => {
    const config = getApiConfig();
    return config.mode === 'static' 
      ? staticApiCall('books.json') 
      : apiCall('/api/books');
  },

  getBooksByStatus: async (status: string): Promise<Book[]> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      const all = await staticApiCall<Book[]>('books.json');
      return all.filter(b => b.status === status);
    }
    return apiCall(`/api/books/${encodeURIComponent(status)}`);
  },

  // Courses
  getCourses: (): Promise<Course[]> => {
    const config = getApiConfig();
    return config.mode === 'static' 
      ? staticApiCall('courses.json') 
      : apiCall('/api/courses');
  },

  getCoursesByStatus: async (status: string): Promise<Course[]> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      const all = await staticApiCall<Course[]>('courses.json');
      return all.filter(c => c.status === status);
    }
    return apiCall(`/api/courses/${encodeURIComponent(status)}`);
  },

  getFeaturedCourses: async (): Promise<Course[]> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      const all = await staticApiCall<Course[]>('courses.json');
      return all.filter(c => c.featured);
    }
    return apiCall('/api/courses/featured');
  },

  // Articles
  getArticles: (): Promise<Article[]> => {
    const config = getApiConfig();
    return config.mode === 'static' 
      ? staticApiCall('articles.json') 
      : apiCall('/api/articles');
  },

  getArticlesByStatus: async (status: string): Promise<Article[]> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      const all = await staticApiCall<Article[]>('articles.json');
      return all.filter(a => a.status === status);
    }
    return apiCall(`/api/articles/${encodeURIComponent(status)}`);
  },

  getFeaturedArticles: async (): Promise<Article[]> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      const all = await staticApiCall<Article[]>('articles.json');
      return all.filter(a => a.featured);
    }
    return apiCall('/api/articles/featured');
  },

  // Contact Content
  getContactContent: async (): Promise<ContactContentWithParsedJson> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      return staticApiCall('contact-content.json');
    }
    return apiCall('/api/contact-content');
  },

  // Footer Content
  getFooterContent: async (): Promise<FooterContentWithParsedJson> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      return staticApiCall('footer-content.json');
    }
    return apiCall('/api/footer-content');
  },

  // Testimonials
  getTestimonials: (): Promise<Testimonial[]> => {
    const config = getApiConfig();
    return config.mode === 'static' 
      ? staticApiCall('testimonials.json') 
      : apiCall('/api/testimonials');
  },

  // Contact form submission
  submitContact: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
    company?: string;
  }): Promise<{ message: string }> => {
    const config = getApiConfig();
    if (config.mode === 'static') {
      // In static mode, just simulate success
      console.log('📧 Contact form submission (static mode):', data);
      return { message: 'Thank you for your message! I will get back to you soon.' };
    }
    return apiCall('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};
