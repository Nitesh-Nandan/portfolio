import type { PersonalInfo, WorkExperience, Project, Skill, Book, Course, Article } from "@shared/schema";

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

// Minimal API client - read-only endpoints only
export const api = {
  // Personal Info
  getPersonalInfo: (): Promise<PersonalInfo> => 
    apiCall('/api/personal-info'),

  // Work Experience  
  getWorkExperience: (): Promise<WorkExperience[]> => 
    apiCall('/api/work-experience'),

  // Projects
  getProjects: (): Promise<Project[]> => 
    apiCall('/api/projects'),

  getFeaturedProjects: (): Promise<Project[]> => 
    apiCall('/api/projects/featured'),

  // Skills
  getSkills: (): Promise<Skill[]> => 
    apiCall('/api/skills'),

  getSkillsByCategory: (category: string): Promise<Skill[]> => 
    apiCall(`/api/skills?category=${encodeURIComponent(category)}`),

  // Books/Learning
  getBooks: (): Promise<Book[]> => 
    apiCall('/api/books'),

  getBooksByStatus: (status: string): Promise<Book[]> => 
    apiCall(`/api/books/${encodeURIComponent(status)}`),

  // Courses
  getCourses: (): Promise<Course[]> => 
    apiCall('/api/courses'),

  getCoursesByStatus: (status: string): Promise<Course[]> => 
    apiCall(`/api/courses/${encodeURIComponent(status)}`),

  getFeaturedCourses: (): Promise<Course[]> => 
    apiCall('/api/courses/featured'),

  // Articles
  getArticles: (): Promise<Article[]> => 
    apiCall('/api/articles'),

  getArticlesByStatus: (status: string): Promise<Article[]> => 
    apiCall(`/api/articles/${encodeURIComponent(status)}`),

  getFeaturedArticles: (): Promise<Article[]> => 
    apiCall('/api/articles/featured'),

  // Admin functions (for your personal use)
  admin: {
    syncToDatabase: (): Promise<{ message: string }> => 
      fetch('/api/admin/sync-to-db', { method: 'POST' }).then(res => res.json()),

    backupToJson: (): Promise<{ message: string }> => 
      fetch('/api/admin/backup-to-json', { method: 'POST' }).then(res => res.json()),

    updatePersonalInfo: (data: Partial<PersonalInfo>): Promise<{ message: string }> =>
      fetch('/api/admin/personal-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json())
  }
};
