import { 
  users, projects, books, contactMessages, workExperience, personalInfo, categories, skills, 
  education, certifications, courses, blogPosts, socialLinks, achievements, testimonials, 
  analytics, settings,
  type User, type InsertUser, type Project, type InsertProject, type Book, type InsertBook, 
  type ContactMessage, type InsertContactMessage, type WorkExperience, type InsertWorkExperience,
  type PersonalInfo, type InsertPersonalInfo, type Category, type InsertCategory, 
  type Skill, type InsertSkill, type Education, type InsertEducation, 
  type Certification, type InsertCertification, type Course, type InsertCourse,
  type BlogPost, type InsertBlogPost, type SocialLink, type InsertSocialLink,
  type Achievement, type InsertAchievement, type Testimonial, type InsertTestimonial,
  type Analytics, type InsertAnalytics, type Setting, type InsertSetting
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, asc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  softDeleteUser(id: number): Promise<boolean>;
  
  // Personal Info
  getPersonalInfo(): Promise<PersonalInfo | undefined>;
  createPersonalInfo(info: InsertPersonalInfo): Promise<PersonalInfo>;
  updatePersonalInfo(id: number, info: Partial<InsertPersonalInfo>): Promise<PersonalInfo>;
  softDeletePersonalInfo(id: number): Promise<boolean>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoriesByType(type: string): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category>;
  deleteCategory(id: number): Promise<boolean>;
  softDeleteCategory(id: number): Promise<boolean>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  getFeaturedSkills(): Promise<Skill[]>;
  getSkillsByCategory(categoryId: number): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: number): Promise<boolean>;
  softDeleteSkill(id: number): Promise<boolean>;
  
  // Education
  getEducation(): Promise<Education[]>;
  getCurrentEducation(): Promise<Education[]>;
  getEducationItem(id: number): Promise<Education | undefined>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education>;
  deleteEducation(id: number): Promise<boolean>;
  softDeleteEducation(id: number): Promise<boolean>;
  
  // Certifications
  getCertifications(): Promise<Certification[]>;
  getActiveCertifications(): Promise<Certification[]>;
  getCertification(id: number): Promise<Certification | undefined>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification>;
  deleteCertification(id: number): Promise<boolean>;
  softDeleteCertification(id: number): Promise<boolean>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCategory(categoryId: number): Promise<Project[]>;
  getProjectsByStatus(status: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<boolean>;
  softDeleteProject(id: number): Promise<boolean>;
  
  // Courses
  getCourses(): Promise<Course[]>;
  getFeaturedCourses(): Promise<Course[]>;
  getCoursesByStatus(status: string): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course>;
  deleteCourse(id: number): Promise<boolean>;
  softDeleteCourse(id: number): Promise<boolean>;
  
  // Books
  getBooks(): Promise<Book[]>;
  getFeaturedBooks(): Promise<Book[]>;
  getBooksByStatus(status: string): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: Partial<InsertBook>): Promise<Book>;
  deleteBook(id: number): Promise<boolean>;
  softDeleteBook(id: number): Promise<boolean>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getFeaturedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<boolean>;
  softDeleteBlogPost(id: number): Promise<boolean>;
  
  // Social Links
  getSocialLinks(): Promise<SocialLink[]>;
  getActiveSocialLinks(): Promise<SocialLink[]>;
  getSocialLink(id: number): Promise<SocialLink | undefined>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: number, link: Partial<InsertSocialLink>): Promise<SocialLink>;
  deleteSocialLink(id: number): Promise<boolean>;
  softDeleteSocialLink(id: number): Promise<boolean>;
  
  // Work Experience
  getWorkExperience(): Promise<WorkExperience[]>;
  getCurrentWorkExperience(): Promise<WorkExperience[]>;
  getWorkExperienceItem(id: number): Promise<WorkExperience | undefined>;
  createWorkExperience(experience: InsertWorkExperience): Promise<WorkExperience>;
  updateWorkExperience(id: number, experience: Partial<InsertWorkExperience>): Promise<WorkExperience>;
  deleteWorkExperience(id: number): Promise<boolean>;
  softDeleteWorkExperience(id: number): Promise<boolean>;
  
  // Achievements
  getAchievements(): Promise<Achievement[]>;
  getFeaturedAchievements(): Promise<Achievement[]>;
  getAchievement(id: number): Promise<Achievement | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement>;
  deleteAchievement(id: number): Promise<boolean>;
  softDeleteAchievement(id: number): Promise<boolean>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<boolean>;
  softDeleteTestimonial(id: number): Promise<boolean>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessagesByStatus(status: string): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  updateContactMessage(id: number, message: Partial<InsertContactMessage>): Promise<ContactMessage>;
  deleteContactMessage(id: number): Promise<boolean>;
  softDeleteContactMessage(id: number): Promise<boolean>;
  
  // Analytics
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalytics(startDate?: string, endDate?: string): Promise<Analytics[]>;
  getAnalyticsByEvent(event: string): Promise<Analytics[]>;
  softDeleteAnalytics(id: number): Promise<boolean>;
  
  // Settings
  getSettings(): Promise<Setting[]>;
  getSetting(key: string): Promise<Setting | undefined>;
  createSetting(setting: InsertSetting): Promise<Setting>;
  updateSetting(key: string, value: string): Promise<Setting>;
  deleteSetting(key: string): Promise<boolean>;
  softDeleteSetting(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private books: Map<number, Book>;
  private contactMessages: Map<number, ContactMessage>;
  private personalInfo: PersonalInfo | undefined;
  private categories: Map<number, Category>;
  private skills: Map<number, Skill>;
  private education: Map<number, Education>;
  private certifications: Map<number, Certification>;
  private courses: Map<number, Course>;
  private blogPosts: Map<number, BlogPost>;
  private socialLinks: Map<number, SocialLink>;
  private achievements: Map<number, Achievement>;
  private testimonials: Map<number, Testimonial>;
  private analytics: Map<number, Analytics>;
  private settings: Map<string, Setting>;
  private workExperienceItems: Map<number, WorkExperience>;
  
  private currentUserId: number;
  private currentProjectId: number;
  private currentBookId: number;
  private currentMessageId: number;
  private currentCategoryId: number;
  private currentSkillId: number;
  private currentEducationId: number;
  private currentCertificationId: number;
  private currentCourseId: number;
  private currentBlogPostId: number;
  private currentSocialLinkId: number;
  private currentAchievementId: number;
  private currentTestimonialId: number;
  private currentAnalyticsId: number;
  private currentWorkExperienceId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.books = new Map();
    this.contactMessages = new Map();
    this.categories = new Map();
    this.skills = new Map();
    this.education = new Map();
    this.certifications = new Map();
    this.courses = new Map();
    this.blogPosts = new Map();
    this.socialLinks = new Map();
    this.achievements = new Map();
    this.testimonials = new Map();
    this.analytics = new Map();
    this.settings = new Map();
    this.workExperienceItems = new Map();
    
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentBookId = 1;
    this.currentMessageId = 1;
    this.currentCategoryId = 1;
    this.currentSkillId = 1;
    this.currentEducationId = 1;
    this.currentCertificationId = 1;
    this.currentCourseId = 1;
    this.currentBlogPostId = 1;
    this.currentSocialLinkId = 1;
    this.currentAchievementId = 1;
    this.currentTestimonialId = 1;
    this.currentAnalyticsId = 1;
    this.currentWorkExperienceId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Personal Info
    this.personalInfo = {
      id: 1,
      firstName: "Nitesh",
      lastName: "Nandan",
      title: "Backend Engineer & GenAI Expert",
      bio: "Passionate backend engineer with expertise in distributed systems, microservices architecture, and GenAI integration. Currently working at Wayfair, building scalable solutions that handle millions of requests while maintaining high performance and reliability.",
      email: "niteshnitp5686@gmail.com",
      phone: "+91 9955328756",
      location: "Bengaluru, Karnataka, India",
      profileImage: "/api/placeholder/400/400",
      resumeUrl: "/resume.pdf",
      availability: "available",
      availabilityMessage: "Open to new opportunities and exciting projects",
      is_deleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Categories
    const sampleCategories: InsertCategory[] = [
      { name: "Backend", slug: "backend", description: "Backend development and architecture", color: "#059669", icon: "Server", type: "skill" },
      { name: "Database", slug: "database", description: "Database technologies and optimization", color: "#dc2626", icon: "Database", type: "skill" },
      { name: "DevOps", slug: "devops", description: "DevOps and cloud technologies", color: "#2563eb", icon: "Cloud", type: "skill" },
      { name: "AI/ML", slug: "ai-ml", description: "Artificial Intelligence and Machine Learning", color: "#7c3aed", icon: "Brain", type: "skill" },
      { name: "Web Development", slug: "web-dev", description: "Full-stack web development projects", color: "#059669", icon: "Globe", type: "project" },
      { name: "System Architecture", slug: "system-arch", description: "System design and architecture projects", color: "#dc2626", icon: "Network", type: "project" }
    ];

    sampleCategories.forEach(category => {
      this.createCategory(category);
    });

    // Skills
    const sampleSkills: InsertSkill[] = [
      { name: "Java", proficiency: 9, categoryId: 1, yearsExperience: "5.0", description: "Advanced Java development with Spring ecosystem", icon: "☕", color: "#f59e0b", featured: true, order: 1 },
      { name: "Spring Boot", proficiency: 9, categoryId: 1, yearsExperience: "4.0", description: "Microservices and REST API development", featured: true, order: 2 },
      { name: "MySQL", proficiency: 8, categoryId: 2, yearsExperience: "5.0", description: "Database design and optimization", featured: true, order: 3 },
      { name: "Redis", proficiency: 8, categoryId: 2, yearsExperience: "3.0", description: "Caching and session management", featured: true, order: 4 },
      { name: "Kubernetes", proficiency: 7, categoryId: 3, yearsExperience: "2.5", description: "Container orchestration", featured: true, order: 5 },
      { name: "Docker", proficiency: 8, categoryId: 3, yearsExperience: "3.0", description: "Containerization", featured: true, order: 6 },
      { name: "RabbitMQ", proficiency: 7, categoryId: 1, yearsExperience: "2.0", description: "Message queuing systems", featured: false, order: 7 },
      { name: "GenAI", proficiency: 7, categoryId: 4, yearsExperience: "1.5", description: "AI integration and implementation", featured: true, order: 8 }
    ];

    sampleSkills.forEach(skill => {
      this.createSkill(skill);
    });

    // Projects
    const sampleProjects: InsertProject[] = [
      {
        title: "Scalable Microservices Architecture",
        description: "Designed and implemented a highly scalable microservices architecture serving 50K-70K RPS with 99.9% uptime. Built using Java Spring Boot, Kubernetes, Redis, and MySQL with comprehensive monitoring and alerting.",
        shortDescription: "High-performance microservices handling 70K RPS",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        technologies: ["Java", "Spring Boot", "Kubernetes", "Redis", "MySQL", "RabbitMQ", "Prometheus"],
        liveUrl: "https://wayfair.com",
        githubUrl: null,
        featured: true,
        status: "completed",
        categoryId: 7,
        startDate: "2022-01",
        endDate: "2023-12",
        teamSize: 8,
        role: "Lead Backend Engineer",
        challenges: ["High traffic scaling", "Database optimization", "Zero-downtime deployments"],
        learnings: ["Advanced Spring patterns", "Kubernetes optimization", "Performance tuning techniques"],
        metrics: { rps: "70000", latency: "45ms", uptime: "99.9%", cost_reduction: "25%" },
        order: 1
      },
      {
        title: "AI-Powered Messaging Platform",
        description: "Developed GenAI-integrated messaging platform processing 1M+ messages daily with real-time sentiment analysis and intelligent routing. Implemented using Python, TensorFlow, and cloud-native architecture.",
        shortDescription: "GenAI messaging platform with 1M+ daily messages",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        technologies: ["Python", "TensorFlow", "GenAI", "RabbitMQ", "Redis", "PostgreSQL"],
        liveUrl: null,
        githubUrl: "https://github.com/niteshnandan/ai-messaging",
        featured: true,
        status: "completed",
        categoryId: 8,
        startDate: "2023-06",
        endDate: "2024-01",
        teamSize: 5,
        role: "GenAI Integration Lead",
        challenges: ["AI model optimization", "Real-time processing", "Message queue scaling"],
        learnings: ["GenAI implementation patterns", "Message queue optimization", "Performance monitoring"],
        metrics: { messages_per_day: "1000000", processing_time: "10ms", accuracy: "95%" },
        order: 2
      },
      {
        title: "Cost Optimization Dashboard",
        description: "Built comprehensive cost optimization dashboard reducing infrastructure costs by 25% through intelligent resource allocation and automated scaling. Features real-time monitoring and predictive analytics.",
        shortDescription: "Infrastructure cost optimization with 25% savings",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        technologies: ["React", "Node.js", "AWS", "Docker", "Grafana", "Prometheus"],
        liveUrl: "https://cost-optimizer.wayfair.com",
        githubUrl: null,
        featured: false,
        status: "completed",
        categoryId: 6,
        startDate: "2023-01",
        endDate: "2023-06",
        teamSize: 3,
        role: "Full-stack Developer",
        challenges: ["Complex data visualization", "Real-time updates", "Cost prediction algorithms"],
        learnings: ["Cost optimization techniques", "Advanced monitoring setup", "Resource management"],
        metrics: { cost_reduction: "25%", uptime: "99.95%", savings: "$50000" },
        order: 3
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });

    // Sample books (keeping existing structure but adding new fields)
    const sampleBooks: InsertBook[] = [
      {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        isbn: "978-1449373320",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        rating: 5,
        status: "currently-reading",
        progress: 75,
        startDate: "2024-01-15",
        notes: "Excellent insights into distributed systems",
        quotes: ["Data is a precious thing and will last longer than the systems themselves"],
        tags: ["systems", "data", "architecture"],
        genre: "Technology",
        pages: 590,
        featured: true
      },
      {
        title: "System Design Interview",
        author: "Alex Xu",
        isbn: "978-1736049112",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
        rating: 4,
        status: "completed",
        progress: 100,
        startDate: "2023-11-01",
        completedDate: "2023-12-15",
        notes: "Great for interview preparation",
        genre: "Technology",
        pages: 322,
        featured: true
      },
      {
        title: "Building Microservices",
        author: "Sam Newman",
        isbn: "978-1491950357",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        rating: 0,
        status: "want-to-read",
        progress: 0,
        genre: "Technology",
        pages: 280,
        featured: false
      }
    ];

    sampleBooks.forEach(book => {
      this.createBook(book);
    });

    // Social Links
    const sampleSocialLinks: InsertSocialLink[] = [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/niteshnandan", username: "niteshnandan", displayName: "LinkedIn", icon: "linkedin", color: "#0077b5", active: true, order: 1 },
      { platform: "GitHub", url: "https://github.com/niteshnandan", username: "niteshnandan", displayName: "GitHub", icon: "github", color: "#333", active: true, order: 2 },
      { platform: "Email", url: "mailto:niteshnitp5686@gmail.com", username: "niteshnitp5686", displayName: "Email", icon: "mail", color: "#ea4335", active: true, order: 3 }
    ];

    sampleSocialLinks.forEach(link => {
      this.createSocialLink(link);
    });

    // Work Experience (enhanced)
    const sampleWorkExperience: InsertWorkExperience[] = [
      {
        company: "Wayfair",
        position: "Backend Engineer & GenAI Expert",
        department: "Engineering",
        location: "Boston, MA",
        workType: "full-time",
        remote: true,
        startDate: "2022-01",
        endDate: null,
        description: "Leading backend development initiatives and GenAI integration for e-commerce platform serving millions of customers globally.",
        achievements: [
          "Architected and implemented scalable microservices handling 50K-70K RPS",
          "Reduced system latency by 40% through optimization of database queries and caching strategies",
          "Led GenAI integration team, implementing AI-powered product recommendations",
          "Mentored junior developers and established best practices for backend development"
        ],
        technologies: ["Java", "Spring Boot", "Microservices", "Kubernetes", "Redis", "MySQL", "GenAI", "RabbitMQ"],
        projects: ["Microservices Architecture", "AI Messaging Platform", "Cost Optimization"],
        teamSize: 8,
        reportingTo: "Senior Engineering Manager",
        companyWebsite: "https://wayfair.com",
        isCurrent: true,
        order: 1
      }
    ];

    sampleWorkExperience.forEach(exp => {
      this.createWorkExperience(exp);
    });
  }

  // Implementation methods for all the new interfaces...
  // Personal Info methods
  async getPersonalInfo(): Promise<PersonalInfo | undefined> {
    return this.personalInfo && !this.personalInfo.is_deleted ? this.personalInfo : undefined;
  }

  async createPersonalInfo(info: InsertPersonalInfo): Promise<PersonalInfo> {
    const personalInfo: PersonalInfo = {
      ...info,
      id: 1,
      is_deleted: false,
      phone: info.phone ?? null,
      profileImage: info.profileImage ?? null,
      resumeUrl: info.resumeUrl ?? null,
      availability: info.availability ?? "available",
      availabilityMessage: info.availabilityMessage ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.personalInfo = personalInfo;
    return personalInfo;
  }

  async updatePersonalInfo(id: number, info: Partial<InsertPersonalInfo>): Promise<PersonalInfo> {
    if (this.personalInfo && this.personalInfo.id === id && !this.personalInfo.is_deleted) {
      this.personalInfo = {
        ...this.personalInfo,
        ...info,
        updatedAt: new Date()
      };
      return this.personalInfo;
    }
    throw new Error("Personal info not found");
  }

  async softDeletePersonalInfo(id: number): Promise<boolean> {
    if (this.personalInfo && this.personalInfo.id === id && !this.personalInfo.is_deleted) {
      this.personalInfo = {
        ...this.personalInfo,
        is_deleted: true,
        updatedAt: new Date()
      };
      return true;
    }
    return false;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(cat => !cat.is_deleted);
  }

  async getCategoriesByType(type: string): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(cat => cat.type === type && !cat.is_deleted);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const category = this.categories.get(id);
    return category && !category.is_deleted ? category : undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { 
      ...insertCategory, 
      id, 
      is_deleted: false,
      description: insertCategory.description ?? null,
      color: insertCategory.color ?? null,
      icon: insertCategory.icon ?? null
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category> {
    const existing = this.categories.get(id);
    if (!existing || existing.is_deleted) throw new Error("Category not found");
    const updated = { ...existing, ...category };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const existing = this.categories.get(id);
    if (!existing || existing.is_deleted) return false;
    this.categories.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteCategory(id: number): Promise<boolean> {
    const existing = this.categories.get(id);
    if (!existing || existing.is_deleted) return false;
    this.categories.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .filter(skill => !skill.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getFeaturedSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .filter(skill => skill.featured && !skill.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getSkillsByCategory(categoryId: number): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(skill => skill.categoryId === categoryId && !skill.is_deleted);
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    const skill = this.skills.get(id);
    return skill && !skill.is_deleted ? skill : undefined;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = { 
      ...insertSkill, 
      id, 
      is_deleted: false,
      description: insertSkill.description ?? null,
      color: insertSkill.color ?? null,
      icon: insertSkill.icon ?? null,
      categoryId: insertSkill.categoryId ?? null,
      yearsExperience: insertSkill.yearsExperience ?? null,
      featured: insertSkill.featured ?? false,
      order: insertSkill.order ?? 0,
      proficiency: insertSkill.proficiency ?? 1
    };
    this.skills.set(id, skill);
    return skill;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill> {
    const existing = this.skills.get(id);
    if (!existing || existing.is_deleted) throw new Error("Skill not found");
    const updated = { ...existing, ...skill };
    this.skills.set(id, updated);
    return updated;
  }

  async deleteSkill(id: number): Promise<boolean> {
    const existing = this.skills.get(id);
    if (!existing || existing.is_deleted) return false;
    this.skills.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteSkill(id: number): Promise<boolean> {
    const existing = this.skills.get(id);
    if (!existing || existing.is_deleted) return false;
    this.skills.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Education methods
  async getEducation(): Promise<Education[]> {
    return Array.from(this.education.values()).filter(edu => !edu.is_deleted);
  }

  async getCurrentEducation(): Promise<Education[]> {
    return Array.from(this.education.values()).filter(edu => edu.isCurrent && !edu.is_deleted);
  }

  async getEducationItem(id: number): Promise<Education | undefined> {
    const edu = this.education.get(id);
    return edu && !edu.is_deleted ? edu : undefined;
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const id = this.currentEducationId++;
    const education: Education = { 
      ...insertEducation, 
      id, 
      is_deleted: false,
      endDate: insertEducation.endDate ?? null,
      grade: insertEducation.grade ?? null,
      description: insertEducation.description ?? null,
      achievements: insertEducation.achievements ?? null,
      location: insertEducation.location ?? null,
      isCurrent: insertEducation.isCurrent ?? false
    };
    this.education.set(id, education);
    return education;
  }

  async updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education> {
    const existing = this.education.get(id);
    if (!existing || existing.is_deleted) throw new Error("Education not found");
    const updated = { ...existing, ...education };
    this.education.set(id, updated);
    return updated;
  }

  async deleteEducation(id: number): Promise<boolean> {
    const existing = this.education.get(id);
    if (!existing || existing.is_deleted) return false;
    this.education.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteEducation(id: number): Promise<boolean> {
    const existing = this.education.get(id);
    if (!existing || existing.is_deleted) return false;
    this.education.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Continuing with other methods...
  // (Similar patterns for certifications, courses, blog posts, social links, achievements, testimonials, analytics, settings)

  // Certification methods
  async getCertifications(): Promise<Certification[]> {
    return Array.from(this.certifications.values()).filter(cert => !cert.is_deleted);
  }

  async getActiveCertifications(): Promise<Certification[]> {
    return Array.from(this.certifications.values()).filter(cert => cert.isActive && !cert.is_deleted);
  }

  async getCertification(id: number): Promise<Certification | undefined> {
    const cert = this.certifications.get(id);
    return cert && !cert.is_deleted ? cert : undefined;
  }

  async createCertification(insertCertification: InsertCertification): Promise<Certification> {
    const id = this.currentCertificationId++;
    const certification: Certification = { 
      ...insertCertification, 
      id, 
      is_deleted: false,
      expiryDate: insertCertification.expiryDate ?? null,
      credentialId: insertCertification.credentialId ?? null,
      credentialUrl: insertCertification.credentialUrl ?? null,
      description: insertCertification.description ?? null,
      skills: insertCertification.skills ?? null,
      isActive: insertCertification.isActive ?? true
    };
    this.certifications.set(id, certification);
    return certification;
  }

  async updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification> {
    const existing = this.certifications.get(id);
    if (!existing || existing.is_deleted) throw new Error("Certification not found");
    const updated = { ...existing, ...certification };
    this.certifications.set(id, updated);
    return updated;
  }

  async deleteCertification(id: number): Promise<boolean> {
    const existing = this.certifications.get(id);
    if (!existing || existing.is_deleted) return false;
    this.certifications.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteCertification(id: number): Promise<boolean> {
    const existing = this.certifications.get(id);
    if (!existing || existing.is_deleted) return false;
    this.certifications.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => !course.is_deleted);
  }

  async getFeaturedCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.featured && !course.is_deleted);
  }

  async getCoursesByStatus(status: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.status === status && !course.is_deleted);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const course = this.courses.get(id);
    return course && !course.is_deleted ? course : undefined;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { 
      ...insertCourse, 
      id,
      is_deleted: false,
      url: insertCourse.url ?? null,
      description: insertCourse.description ?? null,
      progress: insertCourse.progress ?? 0,
      rating: insertCourse.rating ?? 0,
      startDate: insertCourse.startDate ?? null,
      completedDate: insertCourse.completedDate ?? null,
      certificateUrl: insertCourse.certificateUrl ?? null,
      skills: insertCourse.skills ?? null,
      notes: insertCourse.notes ?? null,
      featured: insertCourse.featured ?? false,
      categoryId: insertCourse.categoryId ?? null
    };
    this.courses.set(id, course);
    return course;
  }

  async updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course> {
    const existing = this.courses.get(id);
    if (!existing || existing.is_deleted) throw new Error("Course not found");
    const updated = { ...existing, ...course };
    this.courses.set(id, updated);
    return updated;
  }

  async deleteCourse(id: number): Promise<boolean> {
    const existing = this.courses.get(id);
    if (!existing || existing.is_deleted) return false;
    this.courses.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteCourse(id: number): Promise<boolean> {
    const existing = this.courses.get(id);
    if (!existing || existing.is_deleted) return false;
    this.courses.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Blog Post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => !post.is_deleted);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.published && !post.is_deleted);
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.featured && !post.is_deleted);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug && !post.is_deleted);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    return post && !post.is_deleted ? post : undefined;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = {
      ...insertBlogPost,
      id,
      is_deleted: false,
      excerpt: insertBlogPost.excerpt ?? null,
      coverImage: insertBlogPost.coverImage ?? null,
      published: insertBlogPost.published ?? false,
      publishedAt: insertBlogPost.publishedAt ?? null,
      categoryId: insertBlogPost.categoryId ?? null,
      tags: insertBlogPost.tags ?? null,
      readTime: insertBlogPost.readTime ?? null,
      views: insertBlogPost.views ?? 0,
      likes: insertBlogPost.likes ?? 0,
      featured: insertBlogPost.featured ?? false,
      metaTitle: insertBlogPost.metaTitle ?? null,
      metaDescription: insertBlogPost.metaDescription ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost> {
    const existing = this.blogPosts.get(id);
    if (!existing || existing.is_deleted) throw new Error("Blog post not found");
    const updated = { ...existing, ...blogPost, updatedAt: new Date() };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const existing = this.blogPosts.get(id);
    if (!existing || existing.is_deleted) return false;
    this.blogPosts.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteBlogPost(id: number): Promise<boolean> {
    const existing = this.blogPosts.get(id);
    if (!existing || existing.is_deleted) return false;
    this.blogPosts.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Social Link methods
  async getSocialLinks(): Promise<SocialLink[]> {
    return Array.from(this.socialLinks.values())
      .filter(link => !link.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getActiveSocialLinks(): Promise<SocialLink[]> {
    return Array.from(this.socialLinks.values())
      .filter(link => link.active && !link.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getSocialLink(id: number): Promise<SocialLink | undefined> {
    const link = this.socialLinks.get(id);
    return link && !link.is_deleted ? link : undefined;
  }

  async createSocialLink(insertSocialLink: InsertSocialLink): Promise<SocialLink> {
    const id = this.currentSocialLinkId++;
    const socialLink: SocialLink = { 
      ...insertSocialLink, 
      id,
      is_deleted: false,
      username: insertSocialLink.username ?? null,
      displayName: insertSocialLink.displayName ?? null,
      icon: insertSocialLink.icon ?? null,
      color: insertSocialLink.color ?? null,
      active: insertSocialLink.active ?? true,
      order: insertSocialLink.order ?? 0
    };
    this.socialLinks.set(id, socialLink);
    return socialLink;
  }

  async updateSocialLink(id: number, socialLink: Partial<InsertSocialLink>): Promise<SocialLink> {
    const existing = this.socialLinks.get(id);
    if (!existing || existing.is_deleted) throw new Error("Social link not found");
    const updated = { ...existing, ...socialLink };
    this.socialLinks.set(id, updated);
    return updated;
  }

  async deleteSocialLink(id: number): Promise<boolean> {
    const existing = this.socialLinks.get(id);
    if (!existing || existing.is_deleted) return false;
    this.socialLinks.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteSocialLink(id: number): Promise<boolean> {
    const existing = this.socialLinks.get(id);
    if (!existing || existing.is_deleted) return false;
    this.socialLinks.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values())
      .filter(achievement => !achievement.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getFeaturedAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values())
      .filter(achievement => achievement.featured && !achievement.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getAchievement(id: number): Promise<Achievement | undefined> {
    const achievement = this.achievements.get(id);
    return achievement && !achievement.is_deleted ? achievement : undefined;
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentAchievementId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id,
      is_deleted: false,
      issuer: insertAchievement.issuer ?? null,
      category: insertAchievement.category ?? null,
      url: insertAchievement.url ?? null,
      image: insertAchievement.image ?? null,
      featured: insertAchievement.featured ?? false,
      order: insertAchievement.order ?? 0
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement> {
    const existing = this.achievements.get(id);
    if (!existing || existing.is_deleted) throw new Error("Achievement not found");
    const updated = { ...existing, ...achievement };
    this.achievements.set(id, updated);
    return updated;
  }

  async deleteAchievement(id: number): Promise<boolean> {
    const existing = this.achievements.get(id);
    if (!existing || existing.is_deleted) return false;
    this.achievements.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteAchievement(id: number): Promise<boolean> {
    const existing = this.achievements.get(id);
    if (!existing || existing.is_deleted) return false;
    this.achievements.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => !testimonial.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => testimonial.featured && !testimonial.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => testimonial.approved && !testimonial.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const testimonial = this.testimonials.get(id);
    return testimonial && !testimonial.is_deleted ? testimonial : undefined;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      is_deleted: false,
      avatar: insertTestimonial.avatar ?? null,
      linkedinUrl: insertTestimonial.linkedinUrl ?? null,
      email: insertTestimonial.email ?? null,
      relationship: insertTestimonial.relationship ?? null,
      date: insertTestimonial.date ?? null,
      featured: insertTestimonial.featured ?? false,
      approved: insertTestimonial.approved ?? false,
      order: insertTestimonial.order ?? 0
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const existing = this.testimonials.get(id);
    if (!existing || existing.is_deleted) throw new Error("Testimonial not found");
    const updated = { ...existing, ...testimonial };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const existing = this.testimonials.get(id);
    if (!existing || existing.is_deleted) return false;
    this.testimonials.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteTestimonial(id: number): Promise<boolean> {
    const existing = this.testimonials.get(id);
    if (!existing || existing.is_deleted) return false;
    this.testimonials.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Analytics methods
  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = this.currentAnalyticsId++;
    const analytics: Analytics = {
      ...insertAnalytics,
      id,
      is_deleted: false,
      data: insertAnalytics.data ?? null,
      page: insertAnalytics.page ?? null,
      userAgent: insertAnalytics.userAgent ?? null,
      ip: insertAnalytics.ip ?? null,
      country: insertAnalytics.country ?? null,
      city: insertAnalytics.city ?? null,
      referrer: insertAnalytics.referrer ?? null,
      sessionId: insertAnalytics.sessionId ?? null,
      createdAt: new Date()
    };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async getAnalytics(startDate?: string, endDate?: string): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(a => !a.is_deleted);
  }

  async getAnalyticsByEvent(event: string): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(a => a.event === event && !a.is_deleted);
  }

  async softDeleteAnalytics(id: number): Promise<boolean> {
    const existing = this.analytics.get(id);
    if (!existing || existing.is_deleted) return false;
    this.analytics.set(id, { ...existing, is_deleted: true });
    return true;
  }

  // Settings methods
  async getSettings(): Promise<Setting[]> {
    return Array.from(this.settings.values()).filter(s => !s.is_deleted);
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const setting = Array.from(this.settings.values()).find(s => s.key === key && !s.is_deleted);
    return setting;
  }

  async createSetting(insertSetting: InsertSetting): Promise<Setting> {
    const id = this.settings.size + 1;
    const setting: Setting = {
      ...insertSetting,
      id,
      is_deleted: false,
      type: insertSetting.type ?? "string",
      description: insertSetting.description ?? null,
      category: insertSetting.category ?? "general",
      updatedAt: new Date()
    };
    this.settings.set(insertSetting.key, setting);
    return setting;
  }

  async updateSetting(key: string, value: string): Promise<Setting> {
    const existing = Array.from(this.settings.values()).find(s => s.key === key && !s.is_deleted);
    if (!existing) throw new Error("Setting not found");
    const updated = { ...existing, value, updatedAt: new Date() };
    this.settings.set(key, updated);
    return updated;
  }

  async deleteSetting(key: string): Promise<boolean> {
    const existing = Array.from(this.settings.values()).find(s => s.key === key && !s.is_deleted);
    if (!existing) return false;
    this.settings.set(key, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteSetting(id: number): Promise<boolean> {
    const existing = Array.from(this.settings.values()).find(s => s.id === id && !s.is_deleted);
    if (!existing) return false;
    this.settings.set(existing.key, { ...existing, is_deleted: true });
    return true;
  }

  // Existing methods for backward compatibility
  async getUser(id: number): Promise<User | undefined> {
    const user = this.users.get(id);
    return user && !user.is_deleted ? user : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = Array.from(this.users.values()).find(u => u.username === username && !u.is_deleted);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      is_deleted: false
    };
    this.users.set(id, user);
    return user;
  }

  async softDeleteUser(id: number): Promise<boolean> {
    const existing = this.users.get(id);
    if (!existing || existing.is_deleted) return false;
    this.users.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => !project.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured && !project.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getProjectsByCategory(categoryId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.categoryId === categoryId && !project.is_deleted);
  }

  async getProjectsByStatus(status: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.status === status && !project.is_deleted);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const project = this.projects.get(id);
    return project && !project.is_deleted ? project : undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      is_deleted: false,
      shortDescription: insertProject.shortDescription ?? null,
      images: insertProject.images ?? null,
      liveUrl: insertProject.liveUrl ?? null,
      githubUrl: insertProject.githubUrl ?? null,
      featured: insertProject.featured ?? false,
      status: insertProject.status ?? "completed",
      categoryId: insertProject.categoryId ?? null,
      startDate: insertProject.startDate ?? null,
      endDate: insertProject.endDate ?? null,
      teamSize: insertProject.teamSize ?? 1,
      role: insertProject.role ?? null,
      challenges: insertProject.challenges ?? null,
      learnings: insertProject.learnings ?? null,
      metrics: insertProject.metrics ?? null,
      order: insertProject.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const existing = this.projects.get(id);
    if (!existing || existing.is_deleted) throw new Error("Project not found");
    const updated = { ...existing, ...project, updatedAt: new Date() };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    const existing = this.projects.get(id);
    if (!existing || existing.is_deleted) return false;
    this.projects.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteProject(id: number): Promise<boolean> {
    const existing = this.projects.get(id);
    if (!existing || existing.is_deleted) return false;
    this.projects.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => !book.is_deleted);
  }

  async getFeaturedBooks(): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.featured && !book.is_deleted);
  }

  async getBooksByStatus(status: string): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.status === status && !book.is_deleted);
  }

  async getBook(id: number): Promise<Book | undefined> {
    const book = this.books.get(id);
    return book && !book.is_deleted ? book : undefined;
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentBookId++;
    const book: Book = {
      ...insertBook,
      id,
      is_deleted: false,
      isbn: insertBook.isbn ?? null,
      rating: insertBook.rating ?? 0,
      progress: insertBook.progress ?? 0,
      startDate: insertBook.startDate ?? null,
      completedDate: insertBook.completedDate ?? null,
      notes: insertBook.notes ?? null,
      quotes: insertBook.quotes ?? null,
      tags: insertBook.tags ?? null,
      recommendedBy: insertBook.recommendedBy ?? null,
      genre: insertBook.genre ?? null,
      pages: insertBook.pages ?? null,
      featured: insertBook.featured ?? false
    };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: number, book: Partial<InsertBook>): Promise<Book> {
    const existing = this.books.get(id);
    if (!existing || existing.is_deleted) throw new Error("Book not found");
    const updated = { ...existing, ...book };
    this.books.set(id, updated);
    return updated;
  }

  async deleteBook(id: number): Promise<boolean> {
    const existing = this.books.get(id);
    if (!existing || existing.is_deleted) return false;
    this.books.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteBook(id: number): Promise<boolean> {
    const existing = this.books.get(id);
    if (!existing || existing.is_deleted) return false;
    this.books.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      is_deleted: false,
      phone: insertMessage.phone ?? null,
      company: insertMessage.company ?? null,
      projectType: insertMessage.projectType ?? null,
      budget: insertMessage.budget ?? null,
      timeline: insertMessage.timeline ?? null,
      source: insertMessage.source ?? null,
      status: insertMessage.status ?? "new",
      priority: insertMessage.priority ?? "normal",
      tags: insertMessage.tags ?? null,
      notes: insertMessage.notes ?? null,
      replied: insertMessage.replied ?? false,
      repliedAt: insertMessage.repliedAt ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .filter(message => !message.is_deleted)
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  async getContactMessagesByStatus(status: string): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).filter(message => message.status === status && !message.is_deleted);
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    return message && !message.is_deleted ? message : undefined;
  }

  async updateContactMessage(id: number, message: Partial<InsertContactMessage>): Promise<ContactMessage> {
    const existing = this.contactMessages.get(id);
    if (!existing || existing.is_deleted) throw new Error("Contact message not found");
    const updated = { ...existing, ...message, updatedAt: new Date() };
    this.contactMessages.set(id, updated);
    return updated;
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    const existing = this.contactMessages.get(id);
    if (!existing || existing.is_deleted) return false;
    this.contactMessages.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteContactMessage(id: number): Promise<boolean> {
    const existing = this.contactMessages.get(id);
    if (!existing || existing.is_deleted) return false;
    this.contactMessages.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async getWorkExperience(): Promise<WorkExperience[]> {
    return Array.from(this.workExperienceItems.values())
      .filter(exp => !exp.is_deleted)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getCurrentWorkExperience(): Promise<WorkExperience[]> {
    return Array.from(this.workExperienceItems.values()).filter(exp => exp.isCurrent && !exp.is_deleted);
  }

  async getWorkExperienceItem(id: number): Promise<WorkExperience | undefined> {
    const exp = this.workExperienceItems.get(id);
    return exp && !exp.is_deleted ? exp : undefined;
  }

  async createWorkExperience(insertExperience: InsertWorkExperience): Promise<WorkExperience> {
    const id = this.currentWorkExperienceId++;
    const experience: WorkExperience = {
      ...insertExperience,
      id,
      is_deleted: false,
      department: insertExperience.department ?? null,
      workType: insertExperience.workType ?? "full-time",
      remote: insertExperience.remote ?? false,
      endDate: insertExperience.endDate ?? null,
      projects: insertExperience.projects ?? null,
      teamSize: insertExperience.teamSize ?? null,
      reportingTo: insertExperience.reportingTo ?? null,
      salary: insertExperience.salary ?? null,
      companyWebsite: insertExperience.companyWebsite ?? null,
      companyLogo: insertExperience.companyLogo ?? null,
      isCurrent: insertExperience.isCurrent ?? false,
      order: insertExperience.order ?? 0
    };
    this.workExperienceItems.set(id, experience);
    return experience;
  }

  async updateWorkExperience(id: number, experience: Partial<InsertWorkExperience>): Promise<WorkExperience> {
    const existing = this.workExperienceItems.get(id);
    if (!existing || existing.is_deleted) throw new Error("Work experience not found");
    const updated = { ...existing, ...experience };
    this.workExperienceItems.set(id, updated);
    return updated;
  }

  async deleteWorkExperience(id: number): Promise<boolean> {
    const existing = this.workExperienceItems.get(id);
    if (!existing || existing.is_deleted) return false;
    this.workExperienceItems.set(id, { ...existing, is_deleted: true });
    return true;
  }

  async softDeleteWorkExperience(id: number): Promise<boolean> {
    const existing = this.workExperienceItems.get(id);
    if (!existing || existing.is_deleted) return false;
    this.workExperienceItems.set(id, { ...existing, is_deleted: true });
    return true;
  }
}

export class DatabaseStorage implements IStorage {
  // Personal Info methods
  async getPersonalInfo(): Promise<PersonalInfo | undefined> {
    const [info] = await db.select().from(personalInfo).where(eq(personalInfo.is_deleted, false)).limit(1);
    return info || undefined;
  }

  async createPersonalInfo(insertInfo: InsertPersonalInfo): Promise<PersonalInfo> {
    const [info] = await db
      .insert(personalInfo)
      .values({ ...insertInfo, is_deleted: false })
      .returning();
    return info;
  }

  async updatePersonalInfo(id: number, insertInfo: Partial<InsertPersonalInfo>): Promise<PersonalInfo> {
    const [info] = await db
      .update(personalInfo)
      .set({ ...insertInfo, updatedAt: new Date() })
      .where(and(eq(personalInfo.id, id), eq(personalInfo.is_deleted, false)))
      .returning();
    return info;
  }

  async softDeletePersonalInfo(id: number): Promise<boolean> {
    const result = await db
      .update(personalInfo)
      .set({ is_deleted: true })
      .where(and(eq(personalInfo.id, id), eq(personalInfo.is_deleted, false)));
    return (result.rowCount ?? 0) > 0;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).where(eq(categories.is_deleted, false));
  }

  async getCategoriesByType(type: string): Promise<Category[]> {
    return await db.select().from(categories).where(and(eq(categories.type, type), eq(categories.is_deleted, false)));
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(and(eq(categories.id, id), eq(categories.is_deleted, false)));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values({ ...insertCategory, is_deleted: false })
      .returning();
    return category;
  }

  async updateCategory(id: number, insertCategory: Partial<InsertCategory>): Promise<Category> {
    const [category] = await db
      .update(categories)
      .set(insertCategory)
      .where(and(eq(categories.id, id), eq(categories.is_deleted, false)))
      .returning();
    return category;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await db
      .update(categories)
      .set({ is_deleted: true })
      .where(and(eq(categories.id, id), eq(categories.is_deleted, false)));
    return (result.rowCount ?? 0) > 0;
  }

  async softDeleteCategory(id: number): Promise<boolean> {
    const result = await db
      .update(categories)
      .set({ is_deleted: true })
      .where(and(eq(categories.id, id), eq(categories.is_deleted, false)));
    return (result.rowCount ?? 0) > 0;
  }

  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).where(eq(skills.is_deleted, false)).orderBy(asc(skills.order));
  }

  async getFeaturedSkills(): Promise<Skill[]> {
    return await db.select().from(skills).where(and(eq(skills.featured, true), eq(skills.is_deleted, false))).orderBy(asc(skills.order));
  }

  async getSkillsByCategory(categoryId: number): Promise<Skill[]> {
    return await db.select().from(skills).where(and(eq(skills.categoryId, categoryId), eq(skills.is_deleted, false)));
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(and(eq(skills.id, id), eq(skills.is_deleted, false)));
    return skill || undefined;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db
      .insert(skills)
      .values({ ...insertSkill, is_deleted: false })
      .returning();
    return skill;
  }

  async updateSkill(id: number, insertSkill: Partial<InsertSkill>): Promise<Skill> {
    const [skill] = await db
      .update(skills)
      .set(insertSkill)
      .where(and(eq(skills.id, id), eq(skills.is_deleted, false)))
      .returning();
    return skill;
  }

  async deleteSkill(id: number): Promise<boolean> {
    const result = await db
      .update(skills)
      .set({ is_deleted: true })
      .where(and(eq(skills.id, id), eq(skills.is_deleted, false)));
    return (result.rowCount ?? 0) > 0;
  }

  async softDeleteSkill(id: number): Promise<boolean> {
    const result = await db
      .update(skills)
      .set({ is_deleted: true })
      .where(and(eq(skills.id, id), eq(skills.is_deleted, false)));
    return (result.rowCount ?? 0) > 0;
  }

  // Education methods
  async getEducation(): Promise<Education[]> {
    return await db.select().from(education).where(eq(education.is_deleted, false));
  }

  async getCurrentEducation(): Promise<Education[]> {
    return await db.select().from(education).where(and(eq(education.isCurrent, true), eq(education.is_deleted, false)));
  }

  async getEducationItem(id: number): Promise<Education | undefined> {
    const [edu] = await db.select().from(education).where(and(eq(education.id, id), eq(education.is_deleted, false)));
    return edu || undefined;
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const [edu] = await db
      .insert(education)
      .values(insertEducation)
      .returning();
    return edu;
  }

  async updateEducation(id: number, insertEducation: Partial<InsertEducation>): Promise<Education> {
    const [edu] = await db
      .update(education)
      .set(insertEducation)
      .where(eq(education.id, id))
      .returning();
    return edu;
  }

  async deleteEducation(id: number): Promise<boolean> {
    const result = await db.delete(education).where(eq(education.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async softDeleteEducation(id: number): Promise<boolean> {
    const result = await db.delete(education).where(eq(education.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Existing user methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(and(eq(users.id, id), eq(users.is_deleted, false)));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(and(eq(users.username, username), eq(users.is_deleted, false)));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async softDeleteUser(id: number): Promise<boolean> {
    const result = await db
      .update(users)
      .set({ is_deleted: true })
      .where(and(eq(users.id, id), eq(users.is_deleted, false)));
    return (result.rowCount ?? 0) > 0;
  }

  // Existing project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.is_deleted, false)).orderBy(asc(projects.order));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(and(eq(projects.featured, true), eq(projects.is_deleted, false))).orderBy(asc(projects.order));
  }

  async getProjectsByCategory(categoryId: number): Promise<Project[]> {
    return await db.select().from(projects).where(and(eq(projects.categoryId, categoryId), eq(projects.is_deleted, false)));
  }

  async getProjectsByStatus(status: string): Promise<Project[]> {
    return await db.select().from(projects).where(and(eq(projects.status, status), eq(projects.is_deleted, false)));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(and(eq(projects.id, id), eq(projects.is_deleted, false)));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, insertProject: Partial<InsertProject>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ ...insertProject, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async softDeleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Existing book methods
  async getBooks(): Promise<Book[]> {
    return await db.select().from(books).where(eq(books.is_deleted, false));
  }

  async getFeaturedBooks(): Promise<Book[]> {
    return await db.select().from(books).where(and(eq(books.featured, true), eq(books.is_deleted, false)));
  }

  async getBooksByStatus(status: string): Promise<Book[]> {
    return await db.select().from(books).where(and(eq(books.status, status), eq(books.is_deleted, false)));
  }

  async getBook(id: number): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(and(eq(books.id, id), eq(books.is_deleted, false)));
    return book || undefined;
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const [book] = await db
      .insert(books)
      .values(insertBook)
      .returning();
    return book;
  }

  async updateBook(id: number, insertBook: Partial<InsertBook>): Promise<Book> {
    const [book] = await db
      .update(books)
      .set(insertBook)
      .where(eq(books.id, id))
      .returning();
    return book;
  }

  async deleteBook(id: number): Promise<boolean> {
    const result = await db.delete(books).where(eq(books.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async softDeleteBook(id: number): Promise<boolean> {
    const result = await db.delete(books).where(eq(books.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).where(eq(contactMessages.is_deleted, false)).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessagesByStatus(status: string): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).where(and(eq(contactMessages.status, status), eq(contactMessages.is_deleted, false)));
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(and(eq(contactMessages.id, id), eq(contactMessages.is_deleted, false)));
    return message || undefined;
  }

  async updateContactMessage(id: number, insertMessage: Partial<InsertContactMessage>): Promise<ContactMessage> {
    const [message] = await db
      .update(contactMessages)
      .set({ ...insertMessage, updatedAt: new Date() })
      .where(eq(contactMessages.id, id))
      .returning();
    return message;
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async softDeleteContactMessage(id: number): Promise<boolean> {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Work experience methods
  async getWorkExperience(): Promise<WorkExperience[]> {
    return await db.select().from(workExperience).where(eq(workExperience.is_deleted, false)).orderBy(asc(workExperience.order));
  }

  async getCurrentWorkExperience(): Promise<WorkExperience[]> {
    return await db.select().from(workExperience).where(and(eq(workExperience.isCurrent, true), eq(workExperience.is_deleted, false)));
  }

  async getWorkExperienceItem(id: number): Promise<WorkExperience | undefined> {
    const [exp] = await db.select().from(workExperience).where(and(eq(workExperience.id, id), eq(workExperience.is_deleted, false)));
    return exp || undefined;
  }

  async createWorkExperience(insertExperience: InsertWorkExperience): Promise<WorkExperience> {
    const [experience] = await db
      .insert(workExperience)
      .values(insertExperience)
      .returning();
    return experience;
  }

  async updateWorkExperience(id: number, insertExperience: Partial<InsertWorkExperience>): Promise<WorkExperience> {
    const [experience] = await db
      .update(workExperience)
      .set(insertExperience)
      .where(eq(workExperience.id, id))
      .returning();
    return experience;
  }

  async deleteWorkExperience(id: number): Promise<boolean> {
    const result = await db.delete(workExperience).where(eq(workExperience.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async softDeleteWorkExperience(id: number): Promise<boolean> {
    const result = await db.delete(workExperience).where(eq(workExperience.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Placeholder implementations for remaining methods
  // In a real implementation, you would implement all of these following the same pattern
  async getCertifications(): Promise<Certification[]> { return []; }
  async getActiveCertifications(): Promise<Certification[]> { return []; }
  async getCertification(id: number): Promise<Certification | undefined> { return undefined; }
  async createCertification(certification: InsertCertification): Promise<Certification> { throw new Error("Not implemented"); }
  async updateCertification(id: number, certification: Partial<InsertCertification>): Promise<Certification> { throw new Error("Not implemented"); }
  async deleteCertification(id: number): Promise<boolean> { return false; }
  async softDeleteCertification(id: number): Promise<boolean> { return false; }

  async getCourses(): Promise<Course[]> { return []; }
  async getFeaturedCourses(): Promise<Course[]> { return []; }
  async getCoursesByStatus(status: string): Promise<Course[]> { return []; }
  async getCourse(id: number): Promise<Course | undefined> { return undefined; }
  async createCourse(course: InsertCourse): Promise<Course> { throw new Error("Not implemented"); }
  async updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course> { throw new Error("Not implemented"); }
  async deleteCourse(id: number): Promise<boolean> { return false; }
  async softDeleteCourse(id: number): Promise<boolean> { return false; }

  async getBlogPosts(): Promise<BlogPost[]> { return []; }
  async getPublishedBlogPosts(): Promise<BlogPost[]> { return []; }
  async getFeaturedBlogPosts(): Promise<BlogPost[]> { return []; }
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> { return undefined; }
  async getBlogPost(id: number): Promise<BlogPost | undefined> { return undefined; }
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> { throw new Error("Not implemented"); }
  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> { throw new Error("Not implemented"); }
  async deleteBlogPost(id: number): Promise<boolean> { return false; }
  async softDeleteBlogPost(id: number): Promise<boolean> { return false; }

  async getSocialLinks(): Promise<SocialLink[]> { return []; }
  async getActiveSocialLinks(): Promise<SocialLink[]> { return []; }
  async getSocialLink(id: number): Promise<SocialLink | undefined> { return undefined; }
  async createSocialLink(link: InsertSocialLink): Promise<SocialLink> { throw new Error("Not implemented"); }
  async updateSocialLink(id: number, link: Partial<InsertSocialLink>): Promise<SocialLink> { throw new Error("Not implemented"); }
  async deleteSocialLink(id: number): Promise<boolean> { return false; }
  async softDeleteSocialLink(id: number): Promise<boolean> { return false; }

  async getAchievements(): Promise<Achievement[]> { return []; }
  async getFeaturedAchievements(): Promise<Achievement[]> { return []; }
  async getAchievement(id: number): Promise<Achievement | undefined> { return undefined; }
  async createAchievement(achievement: InsertAchievement): Promise<Achievement> { throw new Error("Not implemented"); }
  async updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement> { throw new Error("Not implemented"); }
  async deleteAchievement(id: number): Promise<boolean> { return false; }
  async softDeleteAchievement(id: number): Promise<boolean> { return false; }

  async getTestimonials(): Promise<Testimonial[]> { return []; }
  async getFeaturedTestimonials(): Promise<Testimonial[]> { return []; }
  async getApprovedTestimonials(): Promise<Testimonial[]> { return []; }
  async getTestimonial(id: number): Promise<Testimonial | undefined> { return undefined; }
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> { throw new Error("Not implemented"); }
  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> { throw new Error("Not implemented"); }
  async deleteTestimonial(id: number): Promise<boolean> { return false; }
  async softDeleteTestimonial(id: number): Promise<boolean> { return false; }

  async createAnalytics(analytics: InsertAnalytics): Promise<Analytics> { throw new Error("Not implemented"); }
  async getAnalytics(startDate?: string, endDate?: string): Promise<Analytics[]> { return []; }
  async getAnalyticsByEvent(event: string): Promise<Analytics[]> { return []; }
  async softDeleteAnalytics(id: number): Promise<boolean> { throw new Error("Not implemented"); }

  async getSettings(): Promise<Setting[]> { return []; }
  async getSetting(key: string): Promise<Setting | undefined> { return undefined; }
  async createSetting(setting: InsertSetting): Promise<Setting> { throw new Error("Not implemented"); }
  async updateSetting(key: string, value: string): Promise<Setting> { throw new Error("Not implemented"); }
  async deleteSetting(key: string): Promise<boolean> { return false; }
  async softDeleteSetting(id: number): Promise<boolean> { throw new Error("Not implemented"); }
}

export const storage = new MemStorage();
