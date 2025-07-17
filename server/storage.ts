import { users, projects, books, contactMessages, type User, type InsertUser, type Project, type InsertProject, type Book, type InsertBook, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  getBooks(): Promise<Book[]>;
  getBooksByStatus(status: string): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private books: Map<number, Book>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentBookId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.books = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentBookId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React frontend and Node.js backend, featuring real-time inventory management and payment processing.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
        technologies: ["React", "Node.js", "MongoDB"],
        liveUrl: "https://demo-ecommerce.com",
        githubUrl: "https://github.com/johndoe/ecommerce",
        featured: true
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
        technologies: ["Vue.js", "Firebase", "Tailwind"],
        liveUrl: "https://task-manager-demo.com",
        githubUrl: "https://github.com/johndoe/task-manager",
        featured: true
      },
      {
        title: "Weather Dashboard",
        description: "A beautiful weather application with location-based forecasts, interactive maps, and personalized weather alerts using modern APIs.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=400&fit=crop",
        technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
        liveUrl: "https://weather-dashboard-demo.com",
        githubUrl: "https://github.com/johndoe/weather-dashboard",
        featured: false
      },
      {
        title: "Analytics Dashboard",
        description: "A comprehensive analytics platform with real-time data visualization, custom reports, and interactive charts for business intelligence.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        technologies: ["React", "D3.js", "Express"],
        liveUrl: "https://analytics-demo.com",
        githubUrl: "https://github.com/johndoe/analytics",
        featured: true
      },
      {
        title: "Mobile Banking App",
        description: "A secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=400&fit=crop",
        technologies: ["React Native", "Redux", "Figma"],
        liveUrl: "https://banking-demo.com",
        githubUrl: "https://github.com/johndoe/banking-app",
        featured: false
      },
      {
        title: "Portfolio Website",
        description: "A responsive portfolio website showcasing creative work with smooth animations, optimized performance, and modern design principles.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop",
        technologies: ["HTML5", "SCSS", "GSAP"],
        liveUrl: "https://portfolio-demo.com",
        githubUrl: "https://github.com/johndoe/portfolio",
        featured: false
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });

    // Sample books
    const sampleBooks: InsertBook[] = [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        rating: 5,
        status: "currently-reading",
        progress: 65
      },
      {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        rating: 4,
        status: "currently-reading",
        progress: 30
      },
      {
        title: "Don't Make Me Think",
        author: "Steve Krug",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        rating: 5,
        status: "currently-reading",
        progress: 80
      },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
        rating: 0,
        status: "want-to-read",
        progress: 0
      },
      {
        title: "The Manager's Path",
        author: "Camille Fournier",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=600&fit=crop",
        rating: 0,
        status: "want-to-read",
        progress: 0
      },
      {
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        rating: 5,
        status: "completed",
        progress: 100
      },
      {
        title: "Learning React",
        author: "Alex Banks",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
        rating: 4,
        status: "completed",
        progress: 100
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        rating: 5,
        status: "completed",
        progress: 100
      }
    ];

    sampleBooks.forEach(book => {
      this.createBook(book);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBooksByStatus(status: string): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.status === status);
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentBookId++;
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
