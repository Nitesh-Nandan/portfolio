import type { PersonalInfo, WorkExperience, Project, Skill, Book, Course, Article } from "@shared/schema";

// Simple mode detection based on environment variable only
const getMode = (): 'static' | 'api' => {
  const mode = import.meta.env.VITE_API_MODE;
  
  // Debug logging
  console.log('🔍 Environment debug:', {
    VITE_API_MODE: mode,
    mode_type: typeof mode,
    all_vite_env: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
  });
  
  if (mode === 'static') {
    console.log('📁 Static mode - loading from /data/*.json');
    return 'static';
  }
  
  if (mode === 'api') {
    console.log('🌐 API mode - loading from /api/* endpoints');
    return 'api';
  }
  
  // Default to static if not set
  console.log('📁 Default to static mode (no VITE_API_MODE set)');
  return 'static';
};

// Simple fetch wrapper with error handling
const apiCall = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(endpoint); 
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};

const staticApiCall = async <T>(file: string): Promise<T> => {
  try {
    const response = await fetch(`/data/${file}`);
    if (!response.ok) {
      throw new Error(`Static Data Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch static data /data/${file}:`, error);
    throw error;
  }
};

// Simple API client based on environment variable
export const api = {
  // Personal Info
  getPersonalInfo: (): Promise<PersonalInfo> => {
    const mode = getMode();
    return mode === 'static' 
      ? staticApiCall('personal-info.json') 
      : apiCall('/api/personal-info');
  },

  // Work Experience  
  getWorkExperience: (): Promise<WorkExperience[]> => {
    const mode = getMode();
    return mode === 'static' 
      ? staticApiCall('work-experience.json') 
      : apiCall('/api/work-experience');
  },

  // Projects
  getProjects: (): Promise<Project[]> => {
    const mode = getMode();
    return mode === 'static' 
      ? staticApiCall('projects.json') 
      : apiCall('/api/projects');
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    const mode = getMode();
    if (mode === 'static') {
      const all = await staticApiCall<Project[]>('projects.json');
      return all.filter(p => p.featured);
    }
    return apiCall('/api/projects/featured');
  },

  // Skills
  getSkills: (): Promise<Skill[]> => {
    const mode = getMode();
    return mode === 'static' 
      ? staticApiCall('skills.json') 
      : apiCall('/api/skills');
  },

  getSkillsByCategory: async (category: string): Promise<Skill[]> => {
    const mode = getMode();
    if (mode === 'static') {
      const all = await staticApiCall<Skill[]>('skills.json');
      return all.filter(s => s.category === category);
    }
    return apiCall(`/api/skills?category=${encodeURIComponent(category)}`);
  },

  // Books/Learning
  getBooks: (): Promise<Book[]> => {
    const mode = getMode();
    return mode === 'static' 
      ? staticApiCall('books.json') 
      : apiCall('/api/books');
  },

  getBooksByStatus: async (status: string): Promise<Book[]> => {
    const mode = getMode();
    if (mode === 'static') {
      const all = await staticApiCall<Book[]>('books.json');
      return all.filter(b => b.status === status);
    }
    return apiCall(`/api/books/${encodeURIComponent(status)}`);
  },

  // Courses
  getCourses: (): Promise<Course[]> => {
    const mode = getMode();
    return mode === 'static' 
      ? staticApiCall('courses.json') 
      : apiCall('/api/courses');
  },

  getCoursesByStatus: async (status: string): Promise<Course[]> => {
    const mode = getMode();
    if (mode === 'static') {
      const all = await staticApiCall<Course[]>('courses.json');
      return all.filter(c => c.status === status);
    }
    return apiCall(`/api/courses/${encodeURIComponent(status)}`);
  },

  getFeaturedCourses: async (): Promise<Course[]> => {
    const mode = getMode();
    if (mode === 'static') {
      const all = await staticApiCall<Course[]>('courses.json');
      return all.filter(c => c.featured);
    }
    return apiCall('/api/courses/featured');
  },

  // Articles
  getArticles: (): Promise<Article[]> => {
    const mode = getMode();
    return mode === 'static' 
      ? staticApiCall('articles.json') 
      : apiCall('/api/articles');
  },

  getArticlesByStatus: async (status: string): Promise<Article[]> => {
    const mode = getMode();
    if (mode === 'static') {
      const all = await staticApiCall<Article[]>('articles.json');
      return all.filter(a => a.status === status);
    }
    return apiCall(`/api/articles/${encodeURIComponent(status)}`);
  },

  getFeaturedArticles: async (): Promise<Article[]> => {
    const mode = getMode();
    if (mode === 'static') {
      const all = await staticApiCall<Article[]>('articles.json');
      return all.filter(a => a.featured);
    }
    return apiCall('/api/articles/featured');
  },

  // Admin functions (only work in API mode)
  admin: {
    syncToDatabase: (): Promise<{ message: string }> => {
      const mode = getMode();
      if (mode === 'static') {
        throw new Error('Admin functions not available in static mode');
      }
      return apiCall('/api/admin/sync-to-db');
    },

    backupToJson: (): Promise<{ message: string }> => {
      const mode = getMode();
      if (mode === 'static') {
        throw new Error('Admin functions not available in static mode');
      }
      return apiCall('/api/admin/backup-to-json');
    },

    updatePersonalInfo: (data: Partial<PersonalInfo>): Promise<{ message: string }> => {
      const mode = getMode();
      if (mode === 'static') {
        throw new Error('Admin functions not available in static mode');
      }
      return apiCall('/api/admin/personal-info');
    }
  }
};
