import { db } from "./db";
import { 
  personalInfo, categories, skills, education, certifications, projects, courses, 
  books, blogPosts, socialLinks, workExperience, achievements, testimonials, 
  contactMessages, analytics, settings 
} from "@shared/schema";

async function seed() {
  console.log("🌱 Starting comprehensive database seeding...");

  try {
    // Personal Information
    console.log("📄 Seeding personal information...");
    await db.insert(personalInfo).values({
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
      is_deleted: false
    });

    // Categories
    console.log("📂 Seeding categories...");
    const categoryData = [
      { name: "Backend", slug: "backend", description: "Backend development and architecture", color: "#059669", icon: "Server", type: "skill", is_deleted: false },
      { name: "Database", slug: "database", description: "Database technologies and optimization", color: "#dc2626", icon: "Database", type: "skill", is_deleted: false },
      { name: "DevOps", slug: "devops", description: "DevOps and cloud technologies", color: "#2563eb", icon: "Cloud", type: "skill", is_deleted: false },
      { name: "AI/ML", slug: "ai-ml", description: "Artificial Intelligence and Machine Learning", color: "#7c3aed", icon: "Brain", type: "skill", is_deleted: false },
      { name: "Frontend", slug: "frontend", description: "Frontend development technologies", color: "#f59e0b", icon: "Monitor", type: "skill", is_deleted: false },
      { name: "Web Development", slug: "web-dev", description: "Full-stack web development projects", color: "#059669", icon: "Globe", type: "project", is_deleted: false },
      { name: "System Architecture", slug: "system-arch", description: "System design and architecture projects", color: "#dc2626", icon: "Network", type: "project", is_deleted: false },
      { name: "AI Projects", slug: "ai-projects", description: "Artificial Intelligence and Machine Learning projects", color: "#7c3aed", icon: "Cpu", type: "project", is_deleted: false },
      { name: "Technology", slug: "technology", description: "Technology-related blog posts", color: "#2563eb", icon: "Code", type: "blog", is_deleted: false },
      { name: "Career", slug: "career", description: "Career and professional development", color: "#059669", icon: "TrendingUp", type: "blog", is_deleted: false }
    ];

    for (const category of categoryData) {
      await db.insert(categories).values(category);
    }

    // Skills
    console.log("🛠️ Seeding skills...");
    const skillsData = [
      { name: "Java", proficiency: 9, categoryId: 1, yearsExperience: "5.0", description: "Advanced Java development with Spring ecosystem", icon: "☕", color: "#f59e0b", featured: true, order: 1, is_deleted: false },
      { name: "Spring Boot", proficiency: 9, categoryId: 1, yearsExperience: "4.0", description: "Microservices and REST API development", featured: true, order: 2, is_deleted: false },
      { name: "MySQL", proficiency: 8, categoryId: 2, yearsExperience: "5.0", description: "Database design and optimization", featured: true, order: 3, is_deleted: false },
      { name: "Redis", proficiency: 8, categoryId: 2, yearsExperience: "3.0", description: "Caching and session management", featured: true, order: 4, is_deleted: false },
      { name: "Kubernetes", proficiency: 7, categoryId: 3, yearsExperience: "2.5", description: "Container orchestration", featured: true, order: 5, is_deleted: false },
      { name: "Docker", proficiency: 8, categoryId: 3, yearsExperience: "3.0", description: "Containerization", featured: true, order: 6, is_deleted: false },
      { name: "RabbitMQ", proficiency: 7, categoryId: 1, yearsExperience: "2.0", description: "Message queuing systems", featured: false, order: 7, is_deleted: false },
      { name: "GenAI", proficiency: 7, categoryId: 4, yearsExperience: "1.5", description: "AI integration and implementation", featured: true, order: 8, is_deleted: false },
      { name: "Python", proficiency: 7, categoryId: 1, yearsExperience: "3.0", description: "Backend development and data processing", featured: false, order: 9, is_deleted: false },
      { name: "React", proficiency: 6, categoryId: 5, yearsExperience: "2.0", description: "Frontend development", featured: false, order: 10, is_deleted: false },
      { name: "PostgreSQL", proficiency: 7, categoryId: 2, yearsExperience: "2.5", description: "Advanced database management", featured: false, order: 11, is_deleted: false },
      { name: "AWS", proficiency: 7, categoryId: 3, yearsExperience: "3.0", description: "Cloud infrastructure and services", featured: true, order: 12, is_deleted: false }
    ];

    for (const skill of skillsData) {
      await db.insert(skills).values(skill);
    }

    // Education
    console.log("🎓 Seeding education...");
    const educationData = [
      {
        institution: "National Institute of Technology Patna",
        degree: "Bachelor of Technology",
        field: "Computer Science and Engineering",
        startDate: "2016-07",
        endDate: "2020-05",
        grade: "8.2 CGPA",
        description: "Comprehensive computer science education with focus on algorithms, data structures, and software engineering principles.",
        achievements: [
          "Ranked in top 10% of the class",
          "Led technical team in college fest",
          "Published research paper on machine learning",
          "Won inter-college coding competition"
        ],
        location: "Patna, Bihar",
        isCurrent: false,
        is_deleted: false
      }
    ];

    for (const edu of educationData) {
      await db.insert(education).values(edu);
    }

    // Certifications
    console.log("🏆 Seeding certifications...");
    const certificationsData = [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        issueDate: "2023-03",
        expiryDate: "2026-03",
        credentialId: "AWS-CSA-2023-001",
        credentialUrl: "https://aws.amazon.com/verification/ABC123",
        description: "Demonstrated expertise in designing distributed systems on AWS",
        skills: ["AWS", "Cloud Architecture", "Scalability", "Security"],
        isActive: true,
        is_deleted: false
      },
      {
        name: "Oracle Certified Professional, Java SE Developer",
        issuer: "Oracle",
        issueDate: "2022-08",
        expiryDate: null,
        credentialId: "OCP-JAVA-2022-456",
        credentialUrl: "https://education.oracle.com/verify/DEF456",
        description: "Advanced Java programming and development skills certification",
        skills: ["Java", "OOP", "Collections", "Concurrency"],
        isActive: true,
        is_deleted: false
      },
      {
        name: "Certified Kubernetes Application Developer",
        issuer: "Cloud Native Computing Foundation",
        issueDate: "2023-01",
        expiryDate: "2026-01",
        credentialId: "CKAD-2023-789",
        credentialUrl: "https://www.cncf.io/certification/verify/GHI789",
        description: "Expertise in designing and building applications for Kubernetes",
        skills: ["Kubernetes", "Docker", "DevOps", "Container Orchestration"],
        isActive: true,
        is_deleted: false
      }
    ];

    for (const cert of certificationsData) {
      await db.insert(certifications).values(cert);
    }

    // Enhanced Projects
    console.log("🚀 Seeding projects...");
    const projectsData = [
      {
        title: "Scalable Microservices Architecture",
        description: "Designed and implemented a distributed microservices system handling 50K-70K RPS with Java Spring Boot, Redis, and Kubernetes orchestration. The system improved performance by 40% and reduced infrastructure costs by 25%.",
        shortDescription: "High-performance microservices system handling 70K RPS",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"],
        technologies: ["Java", "Spring Boot", "Redis", "Kubernetes", "MySQL", "Docker"],
        liveUrl: "https://microservices-demo.wayfair.com",
        githubUrl: "https://github.com/nitesh/microservices-architecture",
        featured: true,
        status: "completed",
        categoryId: 7,
        startDate: "2023-01",
        endDate: "2023-06",
        teamSize: 4,
        role: "Tech Lead",
        challenges: ["High concurrency handling", "Data consistency across services", "Service discovery and communication"],
        learnings: ["Advanced Spring patterns", "Kubernetes optimization", "Performance tuning techniques"],
        metrics: { rps: "70000", latency: "45ms", uptime: "99.9%", cost_reduction: "25%" },
        order: 1,
        is_deleted: false
      },
      {
        title: "AI-Powered Bulk Messaging Platform",
        description: "Built a highly scalable messaging platform with GenAI capabilities, reducing message processing time by 10x using RabbitMQ and optimized architecture. Implemented intelligent message routing and content optimization.",
        shortDescription: "GenAI messaging platform with 10x performance improvement",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"],
        technologies: ["Java", "RabbitMQ", "MySQL", "Docker", "GenAI", "Spring Boot"],
        liveUrl: "https://messaging-platform.wayfair.com",
        githubUrl: "https://github.com/nitesh/ai-messaging-platform",
        featured: true,
        status: "completed",
        categoryId: 8,
        startDate: "2023-07",
        endDate: "2023-12",
        teamSize: 3,
        role: "Senior Engineer",
        challenges: ["AI model integration", "Message ordering at scale", "Real-time processing"],
        learnings: ["GenAI implementation patterns", "Message queue optimization", "Performance monitoring"],
        metrics: { messages_per_day: "1000000", processing_time: "10ms", accuracy: "95%" },
        order: 2,
        is_deleted: false
      },
      {
        title: "Cost Optimization System",
        description: "Implemented database and infrastructure cost optimization strategies resulting in 25% cost reduction while maintaining high availability. Developed automated monitoring and alerting systems.",
        shortDescription: "25% cost reduction with maintained availability",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"],
        technologies: ["Java", "MySQL", "Redis", "Prometheus", "Grafana", "AWS"],
        liveUrl: "https://cost-optimizer.wayfair.com",
        githubUrl: "https://github.com/nitesh/cost-optimization-system",
        featured: true,
        status: "completed",
        categoryId: 7,
        startDate: "2022-08",
        endDate: "2022-12",
        teamSize: 2,
        role: "Lead Developer",
        challenges: ["Cost analysis without performance impact", "Real-time monitoring", "Automated optimization"],
        learnings: ["Cost optimization techniques", "Advanced monitoring setup", "Resource management"],
        metrics: { cost_reduction: "25%", uptime: "99.95%", savings: "$50000" },
        order: 3,
        is_deleted: false
      }
    ];

    for (const project of projectsData) {
      await db.insert(projects).values(project);
    }

    // Courses
    console.log("📚 Seeding courses...");
    const coursesData = [
      {
        title: "System Design Interview Masterclass",
        instructor: "Alex Xu",
        platform: "Educative",
        url: "https://www.educative.io/courses/grokking-the-system-design-interview",
        description: "Comprehensive course covering system design principles for technical interviews",
        status: "completed",
        progress: 100,
        rating: 5,
        startDate: "2023-01",
        completedDate: "2023-02",
        certificateUrl: "https://educative.io/certificate/system-design-123",
        skills: ["System Design", "Distributed Systems", "Scalability", "Architecture"],
        notes: "Excellent course for understanding large-scale system design patterns",
        featured: true,
        categoryId: 9,
        is_deleted: false
      },
      {
        title: "Microservices with Spring Boot and Spring Cloud",
        instructor: "John Thompson",
        platform: "Udemy",
        url: "https://www.udemy.com/course/spring-boot-microservices/",
        description: "Building microservices using Spring Boot ecosystem",
        status: "completed",
        progress: 100,
        rating: 4,
        startDate: "2022-09",
        completedDate: "2022-11",
        skills: ["Spring Boot", "Microservices", "Spring Cloud", "Java"],
        notes: "Great practical examples of microservices implementation",
        featured: false,
        categoryId: 9,
        is_deleted: false
      },
      {
        title: "Advanced Kubernetes for Developers",
        instructor: "Linux Foundation",
        platform: "edX",
        url: "https://www.edx.org/course/kubernetes-for-developers",
        description: "Deep dive into Kubernetes for application developers",
        status: "in-progress",
        progress: 75,
        rating: 0,
        startDate: "2024-01",
        skills: ["Kubernetes", "Docker", "DevOps", "Container Orchestration"],
        notes: "Currently working through advanced deployment strategies",
        featured: true,
        categoryId: 9,
        is_deleted: false
      }
    ];

    for (const course of coursesData) {
      await db.insert(courses).values(course);
    }

    // Enhanced Books
    console.log("📖 Seeding books...");
    const booksData = [
      {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        isbn: "978-1449373320",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        rating: 5,
        status: "currently-reading",
        progress: 75,
        startDate: "2024-01-15",
        notes: "Excellent insights into distributed systems and data architecture",
        quotes: ["Data is a precious thing and will last longer than the systems themselves"],
        tags: ["systems", "data", "architecture", "distributed"],
        recommendedBy: "Tech Lead at Wayfair",
        genre: "Technology",
        pages: 590,
        featured: true,
        is_deleted: false
      },
      {
        title: "System Design Interview – An Insider's Guide",
        author: "Alex Xu",
        isbn: "978-1736049112",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
        rating: 5,
        status: "completed",
        progress: 100,
        startDate: "2023-11-01",
        completedDate: "2023-12-15",
        notes: "Perfect for understanding large-scale system design. Clear explanations and practical examples.",
        quotes: ["Scale is not just about handling more users; it's about handling them efficiently"],
        tags: ["system-design", "interviews", "scalability"],
        genre: "Technology",
        pages: 322,
        featured: true,
        is_deleted: false
      },
      {
        title: "Building Microservices",
        author: "Sam Newman",
        isbn: "978-1491950357",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        rating: 4,
        status: "completed",
        progress: 100,
        startDate: "2023-08-01",
        completedDate: "2023-09-30",
        notes: "Comprehensive guide to microservices architecture. Great practical advice.",
        tags: ["microservices", "architecture", "distributed-systems"],
        genre: "Technology",
        pages: 280,
        featured: false,
        is_deleted: false
      },
      {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        isbn: "978-0132350884",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
        rating: 5,
        status: "completed",
        progress: 100,
        startDate: "2022-01-01",
        completedDate: "2022-02-28",
        notes: "Essential reading for any software developer. Changed my approach to writing code.",
        quotes: ["Clean code is not written by following a set of rules. You don't become a software craftsman by learning a list of heuristics."],
        tags: ["clean-code", "best-practices", "software-engineering"],
        genre: "Technology",
        pages: 464,
        featured: true,
        is_deleted: false
      },
      {
        title: "The Pragmatic Programmer",
        author: "David Thomas, Andrew Hunt",
        isbn: "978-0201616224",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        rating: 0,
        status: "want-to-read",
        progress: 0,
        tags: ["programming", "best-practices", "career"],
        recommendedBy: "Senior Engineer",
        genre: "Technology",
        pages: 352,
        featured: false,
        is_deleted: false
      }
    ];

    for (const book of booksData) {
      await db.insert(books).values(book);
    }

    // Blog Posts
    console.log("✍️ Seeding blog posts...");
    const blogPostsData = [
      {
        title: "Building Scalable Microservices with Java and Spring Boot",
        slug: "scalable-microservices-java-spring-boot",
        content: "In this comprehensive guide, we'll explore how to build and deploy scalable microservices using Java and Spring Boot...",
        excerpt: "Learn how to build and deploy scalable microservices using Java, Spring Boot, and modern DevOps practices.",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
        published: true,
        publishedAt: new Date("2024-01-15"),
        categoryId: 9,
        tags: ["java", "spring-boot", "microservices", "architecture"],
        readTime: 12,
        views: 1250,
        likes: 89,
        featured: true,
        metaTitle: "Building Scalable Microservices with Java and Spring Boot",
        metaDescription: "Complete guide to building and deploying scalable microservices using Java, Spring Boot, and modern DevOps practices.",
        is_deleted: false
      },
      {
        title: "My Journey from Junior Developer to Tech Lead",
        slug: "journey-junior-developer-tech-lead",
        content: "Reflecting on my career progression from a junior developer to a tech lead, sharing lessons learned and challenges faced...",
        excerpt: "Personal insights and lessons learned during my career progression from junior developer to tech leadership.",
        coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
        published: true,
        publishedAt: new Date("2023-12-01"),
        categoryId: 10,
        tags: ["career", "leadership", "growth", "personal"],
        readTime: 8,
        views: 850,
        likes: 67,
        featured: true,
        metaTitle: "My Journey from Junior Developer to Tech Lead",
        metaDescription: "Personal insights and lessons learned during career progression from junior developer to tech leadership.",
        is_deleted: false
      },
      {
        title: "Optimizing Database Performance in High-Traffic Applications",
        slug: "optimizing-database-performance-high-traffic",
        content: "Database performance optimization techniques for high-traffic applications, including indexing strategies, query optimization, and caching...",
        excerpt: "Essential techniques for optimizing database performance in high-traffic applications including indexing and caching strategies.",
        coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop",
        published: false,
        categoryId: 9,
        tags: ["database", "performance", "optimization", "mysql"],
        readTime: 15,
        views: 0,
        likes: 0,
        featured: false,
        metaTitle: "Optimizing Database Performance in High-Traffic Applications",
        metaDescription: "Essential techniques for optimizing database performance in high-traffic applications.",
        is_deleted: false
      }
    ];

    for (const post of blogPostsData) {
      await db.insert(blogPosts).values(post);
    }

    // Social Links
    console.log("🔗 Seeding social links...");
    const socialLinksData = [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/niteshnandan",
        username: "niteshnandan",
        displayName: "LinkedIn Profile",
        icon: "linkedin",
        color: "#0077b5",
        active: true,
        order: 1,
        is_deleted: false
      },
      {
        platform: "GitHub",
        url: "https://github.com/niteshnandan",
        username: "niteshnandan",
        displayName: "GitHub Profile",
        icon: "github",
        color: "#333333",
        active: true,
        order: 2,
        is_deleted: false
      },
      {
        platform: "Email",
        url: "mailto:niteshnitp5686@gmail.com",
        username: "niteshnitp5686",
        displayName: "Email Contact",
        icon: "mail",
        color: "#ea4335",
        active: true,
        order: 3,
        is_deleted: false
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/niteshnandan",
        username: "niteshnandan",
        displayName: "Twitter Profile",
        icon: "twitter",
        color: "#1da1f2",
        active: false,
        order: 4,
        is_deleted: false
      }
    ];

    for (const link of socialLinksData) {
      await db.insert(socialLinks).values(link);
    }

    // Work Experience
    console.log("💼 Seeding work experience...");
    const workExperienceData = [
      {
        company: "Wayfair",
        position: "Backend Engineer & GenAI Expert",
        department: "Engineering",
        location: "Boston, MA",
        workType: "full-time",
        remote: true,
        startDate: "2022-01",
        endDate: null,
        description: "Leading backend development initiatives and GenAI integration for e-commerce platform serving millions of customers globally. Responsible for architecting scalable microservices and implementing AI-powered features.",
        achievements: [
          "Architected and implemented scalable microservices handling 50K-70K RPS",
          "Reduced system latency by 40% through optimization of database queries and caching strategies", 
          "Led GenAI integration team, implementing AI-powered product recommendations",
          "Mentored junior developers and established best practices for backend development",
          "Implemented cost optimization strategies resulting in 25% infrastructure cost reduction"
        ],
        technologies: ["Java", "Spring Boot", "Microservices", "Kubernetes", "Redis", "MySQL", "GenAI", "RabbitMQ", "AWS"],
        projects: ["Microservices Architecture Platform", "AI-Powered Messaging System", "Cost Optimization Framework"],
        teamSize: 8,
        reportingTo: "Senior Engineering Manager",
        companyWebsite: "https://www.wayfair.com",
        companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        isCurrent: true,
        order: 1,
        is_deleted: false
      },
      {
        company: "TechCorp Solutions",
        position: "Senior Software Engineer",
        department: "Backend Engineering",
        location: "San Francisco, CA",
        workType: "full-time",
        remote: false,
        startDate: "2020-06",
        endDate: "2021-12",
        description: "Developed and maintained distributed systems and data processing pipelines for enterprise clients. Led backend architecture initiatives and mentored junior team members.",
        achievements: [
          "Built cost optimization system reducing infrastructure costs by 25%",
          "Implemented real-time data processing pipeline handling 1M+ events per day",
          "Led migration from monolithic to microservices architecture",
          "Improved system reliability from 99.5% to 99.9% uptime",
          "Established CI/CD pipelines reducing deployment time by 60%"
        ],
        technologies: ["Python", "Django", "PostgreSQL", "Docker", "AWS", "Kafka", "ElasticSearch", "Redis"],
        projects: ["Enterprise Data Pipeline", "Microservices Migration", "Real-time Analytics System"],
        teamSize: 6,
        reportingTo: "Engineering Lead",
        companyWebsite: "https://techcorpsolutions.com",
        isCurrent: false,
        order: 2,
        is_deleted: false
      }
    ];

    for (const exp of workExperienceData) {
      await db.insert(workExperience).values(exp);
    }

    // Achievements
    console.log("🏆 Seeding achievements...");
    const achievementsData = [
      {
        title: "Top Performer Award 2023",
        description: "Recognized as top performer for exceptional contributions to microservices architecture and GenAI integration projects.",
        issuer: "Wayfair",
        date: "2023-12",
        category: "award",
        url: "https://wayfair.com/awards/2023",
        featured: true,
        order: 1,
        is_deleted: false
      },
      {
        title: "Best Innovation in Backend Systems",
        description: "Awarded for innovative approach to cost optimization and performance improvement in backend systems.",
        issuer: "Tech Excellence Awards",
        date: "2023-06",
        category: "recognition",
        featured: true,
        order: 2,
        is_deleted: false
      },
      {
        title: "Published Research Paper",
        description: "Co-authored research paper on 'Scalable Microservices Architecture for E-commerce Platforms' published in IEEE conference.",
        issuer: "IEEE",
        date: "2023-03",
        category: "publication",
        url: "https://ieeexplore.ieee.org/document/123456",
        featured: false,
        order: 3,
        is_deleted: false
      },
      {
        title: "Mentorship Excellence Award",
        description: "Recognized for outstanding mentorship and contribution to junior developer growth and team culture.",
        issuer: "Wayfair",
        date: "2022-08",
        category: "recognition",
        featured: false,
        order: 4,
        is_deleted: false
      }
    ];

    for (const achievement of achievementsData) {
      await db.insert(achievements).values(achievement);
    }

    // Testimonials
    console.log("💬 Seeding testimonials...");
    const testimonialsData = [
      {
        name: "Sarah Johnson",
        position: "Senior Engineering Manager",
        company: "Wayfair",
        content: "Nitesh is an exceptional backend engineer with deep expertise in microservices and GenAI. His technical leadership and mentoring skills have been invaluable to our team's success.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c27cb9b9?w=150&h=150&fit=crop&crop=face",
        linkedinUrl: "https://linkedin.com/in/sarahjohnson",
        email: "sarah.johnson@wayfair.com",
        relationship: "manager",
        date: "2024-01",
        featured: true,
        approved: true,
        order: 1,
        is_deleted: false
      },
      {
        name: "Michael Chen",
        position: "Tech Lead",
        company: "Wayfair",
        content: "Working with Nitesh on the microservices architecture project was a great experience. His attention to detail and problem-solving skills are outstanding.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        linkedinUrl: "https://linkedin.com/in/michaelchen",
        relationship: "colleague",
        date: "2023-11",
        featured: true,
        approved: true,
        order: 2,
        is_deleted: false
      },
      {
        name: "Priya Sharma", 
        position: "Software Engineer",
        company: "Wayfair",
        content: "Nitesh has been an incredible mentor. His guidance helped me transition from frontend to backend development seamlessly. Always patient and supportive.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        linkedinUrl: "https://linkedin.com/in/priyasharma",
        relationship: "mentee",
        date: "2023-09",
        featured: false,
        approved: true,
        order: 3,
        is_deleted: false
      }
    ];

    for (const testimonial of testimonialsData) {
      await db.insert(testimonials).values(testimonial);
    }

    // Sample Contact Messages
    console.log("📧 Seeding contact messages...");
    const contactMessagesData = [
      {
        name: "John Smith",
        email: "john.smith@techcorp.com",
        subject: "Collaboration Opportunity",
        message: "Hi Nitesh, I came across your profile and I'm impressed by your work on microservices architecture. We have an exciting project and would love to discuss potential collaboration.",
        phone: "+1-555-0123",
        company: "TechCorp Inc",
        projectType: "collaboration",
        budget: "$50k-100k",
        timeline: "3-6 months",
        source: "LinkedIn",
        status: "new",
        priority: "high",
        tags: ["collaboration", "microservices", "high-value"],
        replied: false,
        is_deleted: false
      },
      {
        name: "Alice Johnson",
        email: "alice@startup.io",
        subject: "Technical Consultation",
        message: "Hello! We're a startup building a scalable platform and need guidance on backend architecture. Would you be available for technical consultation?",
        company: "Startup.io",
        projectType: "consultation",
        budget: "$10k-25k",
        timeline: "1-2 months",
        source: "Website",
        status: "read",
        priority: "normal",
        tags: ["consultation", "startup", "architecture"],
        replied: true,
        repliedAt: new Date("2024-01-20"),
        is_deleted: false
      }
    ];

    for (const message of contactMessagesData) {
      await db.insert(contactMessages).values(message);
    }

    // Settings
    console.log("⚙️ Seeding settings...");
    const settingsData = [
      {
        key: "site_title",
        value: "Nitesh Nandan - Backend Engineer & GenAI Expert",
        type: "string",
        description: "Main site title",
        category: "general",
        is_deleted: false
      },
      {
        key: "site_description", 
        value: "Passionate backend engineer specializing in scalable microservices and GenAI integration",
        type: "string",
        description: "Site meta description",
        category: "general",
        is_deleted: false
      },
      {
        key: "analytics_enabled",
        value: "true",
        type: "boolean",
        description: "Enable analytics tracking",
        category: "analytics",
        is_deleted: false
      },
      {
        key: "contact_form_enabled",
        value: "true", 
        type: "boolean",
        description: "Enable contact form",
        category: "contact",
        is_deleted: false
      },
      {
        key: "max_contact_messages_per_day",
        value: "10",
        type: "number",
        description: "Maximum contact messages per day per IP",
        category: "contact",
        is_deleted: false
      },
      {
        key: "featured_projects_count",
        value: "3",
        type: "number",
        description: "Number of featured projects to display",
        category: "display",
        is_deleted: false
      },
      {
        key: "blog_posts_per_page",
        value: "5",
        type: "number", 
        description: "Number of blog posts per page",
        category: "blog",
        is_deleted: false
      },
      {
        key: "theme_color",
        value: "#2563eb",
        type: "string",
        description: "Primary theme color",
        category: "design",
        is_deleted: false
      }
    ];

    for (const setting of settingsData) {
      await db.insert(settings).values(setting);
    }

    // Sample Analytics Data
    console.log("📊 Seeding analytics data...");
    const analyticsData = [
      {
        event: "page_view",
        page: "/",
        data: { source: "direct", device: "desktop" },
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        ip: "192.168.1.100",
        country: "United States",
        city: "San Francisco",
        referrer: null,
        sessionId: "session_123",
        is_deleted: false
      },
      {
        event: "project_view",
        page: "/projects",
        data: { project_id: 1, project_title: "Scalable Microservices Architecture" },
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        ip: "192.168.1.101",
        country: "India",
        city: "Bangalore",
        referrer: "https://linkedin.com",
        sessionId: "session_124",
        is_deleted: false
      },
      {
        event: "contact_form_submit",
        page: "/contact",
        data: { form_type: "contact", success: true },
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
        ip: "192.168.1.102",
        country: "Canada",
        city: "Toronto",
        referrer: "https://google.com",
        sessionId: "session_125",
        is_deleted: false
      }
    ];

    for (const analyticsRecord of analyticsData) {
      await db.insert(analytics).values(analyticsRecord);
    }

    console.log("✅ Database seeding completed successfully!");
    console.log(`
📊 Seeded data summary:
- ✓ Personal Information: 1 record
- ✓ Categories: 10 records  
- ✓ Skills: 12 records
- ✓ Education: 1 record
- ✓ Certifications: 3 records
- ✓ Projects: 3 records
- ✓ Courses: 3 records
- ✓ Books: 5 records
- ✓ Blog Posts: 3 records
- ✓ Social Links: 4 records
- ✓ Work Experience: 2 records
- ✓ Achievements: 4 records
- ✓ Testimonials: 3 records
- ✓ Contact Messages: 2 records
- ✓ Settings: 8 records
- ✓ Analytics: 3 records

🎉 Your comprehensive personal portfolio database is ready!
`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});