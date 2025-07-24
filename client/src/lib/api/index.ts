// Export all API services
export * from './services';
export * from './types';
export * from './config';
export * from './http-client';

// Import services
import { 
  PersonalInfoService, 
  WorkExperienceService, 
  ProjectsService, 
  SkillsService, 
  LearningService, 
  ContentService, 
  AdminService 
} from './services';

// Create service instances
const personalInfoService = new PersonalInfoService();
const workExperienceService = new WorkExperienceService();
const projectsService = new ProjectsService();
const skillsService = new SkillsService();
const learningService = new LearningService();
const contentService = new ContentService();
const adminService = new AdminService();

/**
 * Main API client that maintains backward compatibility
 * while providing access to organized service classes
 */
export const api = {
  // Personal Info
  getPersonalInfo: () => personalInfoService.getPersonalInfo(),
  
  // Work Experience
  getWorkExperience: () => workExperienceService.getWorkExperience(),
  
  // Projects
  getProjects: () => projectsService.getProjects(),
  getFeaturedProjects: () => projectsService.getFeaturedProjects(),
  
  // Skills
  getSkills: () => skillsService.getSkills(),
  getSkillsByCategory: (category: string) => skillsService.getSkillsByCategory(category),
  
  // Books
  getBooks: () => learningService.getBooks(),
  getBooksByStatus: (status: string) => learningService.getBooksByStatus(status),
  
  // Courses
  getCourses: () => learningService.getCourses(),
  getCoursesByStatus: (status: string) => learningService.getCoursesByStatus(status),
  getFeaturedCourses: () => learningService.getFeaturedCourses(),
  
  // Articles
  getArticles: () => learningService.getArticles(),
  getArticlesByStatus: (status: string) => learningService.getArticlesByStatus(status),
  getFeaturedArticles: () => learningService.getFeaturedArticles(),
  
  // Content
  getContactContent: () => contentService.getContactContent(),
  getFooterContent: () => contentService.getFooterContent(),
  getTestimonials: () => contentService.getTestimonials(),
  submitContact: (data: any) => contentService.submitContact(data),
  
  // Admin
  admin: {
    syncToDatabase: () => adminService.syncToDatabase(),
    backupToJson: () => adminService.backupToJson(),
    updatePersonalInfo: (data: any) => personalInfoService.updatePersonalInfo(data),
  },
  
  // Service instances for direct access
  services: {
    personalInfo: personalInfoService,
    workExperience: workExperienceService,
    projects: projectsService,
    skills: skillsService,
    learning: learningService,
    content: contentService,
    admin: adminService,
  },
} as const; 