import { db } from "./db";
import { projects, books, type InsertProject, type InsertBook } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

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

  try {
    // Insert projects
    await db.insert(projects).values(sampleProjects);
    console.log("✓ Projects seeded successfully");

    // Insert books
    await db.insert(books).values(sampleBooks);
    console.log("✓ Books seeded successfully");

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed().catch(console.error);