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
        title: "Scalable Microservices Architecture",
        description: "Designed and implemented a distributed microservices system handling 50K-70K RPS with Java Spring Boot, Redis, and Kubernetes orchestration.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
        technologies: ["Java", "Spring Boot", "Redis", "Kubernetes", "MySQL"],
        liveUrl: null,
        githubUrl: null,
        featured: true
      },
      {
        title: "AI-Powered Bulk Messaging Platform",
        description: "Built a highly scalable messaging platform with GenAI capabilities, reducing message processing time by 10x using RabbitMQ and optimized architecture.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
        technologies: ["Java", "RabbitMQ", "MySQL", "Docker", "GenAI"],
        liveUrl: null,
        githubUrl: null,
        featured: true
      },
      {
        title: "Cost Optimization System",
        description: "Implemented database and infrastructure cost optimization strategies resulting in 25% cost reduction while maintaining high availability.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        technologies: ["Java", "MySQL", "Redis", "Prometheus", "Grafana"],
        liveUrl: null,
        githubUrl: null,
        featured: true
      },
      {
        title: "Electronic Data Interchange (EDI) Parser",
        description: "Designed and developed a robust EDI parser from scratch with multi-threading capabilities using Java and ForkJoinPool for enhanced performance.",
        image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800&h=400&fit=crop",
        technologies: ["Java", "Hibernate", "MySQL", "Multi-threading"],
        liveUrl: null,
        githubUrl: null,
        featured: false
      },
      {
        title: "Supplier Acquisition Platform",
        description: "Led development of supplier onboarding system achieving 4X growth in supplier community with referral system and data analytics.",
        image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=400&fit=crop",
        technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Kafka"],
        liveUrl: null,
        githubUrl: null,
        featured: false
      },
      {
        title: "Real-Time Crowd Behavior Analysis",
        description: "Developed computer vision system using Python for real-time crowd analysis with optical flow algorithms for ATM surveillance applications.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        technologies: ["Python", "OpenCV", "Computer Vision", "Machine Learning"],
        liveUrl: null,
        githubUrl: null,
        featured: false
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });

    // Sample books
    const sampleBooks: InsertBook[] = [
      {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        rating: 5,
        status: "currently-reading",
        progress: 75
      },
      {
        title: "System Design Interview",
        author: "Alex Xu",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
        rating: 0,
        status: "currently-reading",
        progress: 45
      },
      {
        title: "Building Microservices",
        author: "Sam Newman",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        rating: 0,
        status: "currently-reading",
        progress: 30
      },
      {
        title: "Java: The Complete Reference",
        author: "Herbert Schildt",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        rating: 0,
        status: "want-to-read",
        progress: 0
      },
      {
        title: "Hands-On Machine Learning",
        author: "Aurélien Géron",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=600&fit=crop",
        rating: 0,
        status: "want-to-read",
        progress: 0
      },
      {
        title: "Spring Boot in Action",
        author: "Craig Walls",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        rating: 0,
        status: "want-to-read",
        progress: 0
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
        rating: 5,
        status: "completed",
        progress: 100
      },
      {
        title: "Effective Java",
        author: "Joshua Bloch",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        rating: 5,
        status: "completed",
        progress: 100
      },
      {
        title: "High Performance MySQL",
        author: "Baron Schwartz",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        rating: 4,
        status: "completed",
        progress: 100
      },
      {
        title: "Kubernetes in Action",
        author: "Marko Lukša",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        rating: 4,
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
    const project: Project = { 
      ...insertProject, 
      id,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      featured: insertProject.featured || false
    };
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
    const book: Book = { 
      ...insertBook, 
      id,
      rating: insertBook.rating || 0,
      progress: insertBook.progress || 0
    };
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
