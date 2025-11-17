import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Import database connection and schema
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";

neonConfig.webSocketConstructor = ws;

// Script to extract data from database and update JSON files
// Run this periodically to keep fallback data fresh

async function syncFallbackData() {
    console.log('🔄 Starting fallback data sync...');

    try {
        // Database connection
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is required');
        }

        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const db = drizzle({ client: pool });

        const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'data/cache');

        // Ensure data directory exists
        if (!existsSync(dataDir)) {
            mkdirSync(dataDir, { recursive: true });
        }

        // Sync Personal Info
        console.log('📄 Syncing personal information...');
        const personalInfoData = await db.execute(
            'SELECT * FROM personal_info WHERE "isDeleted" = false ORDER BY id LIMIT 1'
        );
        if (personalInfoData.rows.length > 0) {
            const personalInfo = transformPersonalInfo(personalInfoData.rows[0]);
            writeJsonFile(dataDir, 'personal-info.json', personalInfo);
        }

        

        // Sync Skills
        console.log('🛠️ Syncing skills...');
        const skillsData = await db.execute(
            'SELECT * FROM skills WHERE "isDeleted" = false ORDER BY "order", name'
        );
        const skills = skillsData.rows.map(row => transformSkill(row));
        writeJsonFile(dataDir, 'skills.json', skills);

        // Sync Work Experience
        console.log('💼 Syncing work experience...');
        const workExpData = await db.execute(
            'SELECT * FROM work_experience WHERE "isDeleted" = false ORDER BY "order", start_date DESC'
        );
        const workExperience = workExpData.rows.map(row => transformWorkExperience(row));
        writeJsonFile(dataDir, 'work-experience.json', workExperience);

        // Sync Books
        console.log('📚 Syncing books...');
        const booksData = await db.execute(
            'SELECT * FROM books WHERE "isDeleted" = false ORDER BY featured DESC, start_date DESC'
        );
        const books = booksData.rows.map(row => transformBook(row));
        writeJsonFile(dataDir, 'books.json', books);

        // Sync Projects (if needed)
        console.log('🚀 Syncing projects...');
        const projectsData = await db.execute(
            'SELECT * FROM projects WHERE "isDeleted" = false ORDER BY featured DESC, "order"'
        );
        const projects = projectsData.rows.map(row => transformProject(row));
        writeJsonFile(dataDir, 'projects.json', projects);

        // Sync Articles
        console.log('📰 Syncing articles...');
        const articlesData = await db.execute(
            'SELECT * FROM articles WHERE "isDeleted" = false ORDER BY "order"'
        );
        const articles = articlesData.rows.map(row => transformArticle(row));
        writeJsonFile(dataDir, 'articles.json', articles);

        // Sync Testimonials
        console.log('💬 Syncing testimonials...');
        const testimonialsData = await db.execute(
            'SELECT * FROM testimonials WHERE "isDeleted" = false ORDER BY "order"'
        );
        const testimonials = testimonialsData.rows.map(row => transformTestimonial(row));
        writeJsonFile(dataDir, 'testimonials.json', testimonials);

        // Sync Courses
        console.log('🎓 Syncing courses...');
        const coursesData = await db.execute(
            'SELECT * FROM courses WHERE "isDeleted" = false ORDER BY "order"'
        );
        const courses = coursesData.rows.map(row => transformCourse(row));
        writeJsonFile(dataDir, 'courses.json', courses);

        // Sync Contact Content (single record)
        console.log('📬 Syncing contact content...');
        const contactContentData = await db.execute(
            'SELECT * FROM contact_content WHERE "isDeleted" = false ORDER BY id LIMIT 1'
        );
        if (contactContentData.rows.length > 0) {
            const contactContent = transformContactContent(contactContentData.rows[0]);
            writeJsonFile(dataDir, 'contact-content.json', contactContent);
        }

        // Sync Footer Content (single record)
        console.log('🔗 Syncing footer content...');
        const footerContentData = await db.execute(
            'SELECT * FROM footer_content WHERE "isDeleted" = false ORDER BY id LIMIT 1'
        );
        if (footerContentData.rows.length > 0) {
            const footerContent = transformFooterContent(footerContentData.rows[0]);
            writeJsonFile(dataDir, 'footer-content.json', footerContent);
        }

        await pool.end();

        console.log('✅ Fallback data sync completed successfully!');
        console.log(`📁 Updated files in: ${dataDir}`);

    } catch (error) {
        console.error('❌ Failed to sync fallback data:', error);
        throw error;
    }
}

// Helper function to write JSON files
function writeJsonFile(dir, filename, data) {
    const filePath = join(dir, filename);
    const jsonData = JSON.stringify(data, null, 2);
    writeFileSync(filePath, jsonData, 'utf-8');
    console.log(`   ✓ Updated ${filename}`);
}

// Data transformation functions to match expected JSON structure
function transformPersonalInfo(row) {
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        title: row.title,
        bio: JSON.parse(row.bio), // Parse the JSON string into an array
        email: row.email,
        phone: row.phone,
        location: row.location,
        profileImage: row.profile_image,
        resumeUrl: row.resume_url,
        availability: row.availability,
        availabilityMessage: row.availability_message,
        isDeleted: row.isDeleted
    };
}



function transformSkill(row) {
    return {
        id: row.id,
        name: row.name,
        category: row.category,
        proficiency: row.proficiency,
        yearsExperience: row.years_experience,
        featured: row.featured,
        order: row.order,
        isDeleted: row.isDeleted
    };
}

function transformWorkExperience(row) {
    return {
        id: row.id,
        company: row.company,
        position: row.position,
        location: row.location,
        startDate: row.start_date,
        endDate: row.end_date,
        description: row.description,
        achievements: row.achievements || [],
        technologies: row.technologies || [],
        projects: row.projects || [],
        isCurrent: row.is_current,
        order: row.order,
    };
}

function transformBook(row) {
    return {
        id: row.id,
        title: row.title,
        author: row.author,
        image: row.image,
        rating: row.rating,
        status: row.status,
        progress: row.progress,
        startDate: row.start_date,
        completedDate: row.completed_date,
        notes: row.notes,
        quotes: row.quotes || [],
        tags: row.tags || [],
        featured: row.featured,
        isDeleted: row.isDeleted
    };
}

function transformProject(row) {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        shortDescription: row.short_description,
        image: row.image,
        images: row.images || [],
        technologies: row.technologies || [],
        liveUrl: row.live_url,
        githubUrl: row.github_url,
        featured: row.featured,
        status: row.status,
        categoryId: row.category_id,
        startDate: row.start_date,
        endDate: row.end_date,
        teamSize: row.team_size,
        role: row.role,
        challenges: row.challenges || [],
        learnings: row.learnings || [],
        metrics: row.metrics,
        order: row.order,
        lastCommitDate: row.last_commit_date,
        isDeleted: row.isDeleted
    };
}

// Add transformation helpers for new tables
function transformArticle(row) {
    return {
        id: row.id,
        title: row.title,
        url: row.url,
        author: row.author,
        publishedDate: row.published_date,
        readDate: row.read_date,
        summary: row.summary,
        tags: row.tags || [],
        rating: row.rating,
        featured: row.featured,
        status: row.status,
        order: row.order
    };
}

function transformCourse(row) {
    return {
        id: row.id,
        title: row.title,
        instructor: row.instructor,
        url: row.url,
        status: row.status,
        progress: row.progress,
        rating: row.rating,
        startDate: row.start_date,
        completedDate: row.completed_date,
        notes: row.notes,
        tags: row.tags || [],
        featured: row.featured,
        order: row.order
    };
}

function transformTestimonial(row) {
    return {
        id: row.id,
        name: row.name,
        role: row.role,
        company: row.company,
        content: row.content,
        rating: row.rating,
        avatar: row.avatar,
        isDeleted: row.isDeleted
    };
}

function transformContactContent(row) {
    return {
        id: row.id,
        heading: row.heading,
        subheading: row.subheading,
        formTitle: row.form_title,
        connectTitle: row.connect_title,
        contactInfoTitle: row.contact_info_title,
        statusMessage: row.status_message,
        socialLinks: JSON.parse(row.social_links_json)
    };
}

function transformFooterContent(row) {
    return {
        id: row.id,
        quickLinksTitle: row.quick_links_title,
        contactTitle: row.contact_title,
        copyrightText: row.copyright_text,
        quickLinks: JSON.parse(row.quick_links_json),
        socialLinks: JSON.parse(row.social_links_json)
    };
}

// Run the sync function
syncFallbackData().catch((error) => {
    console.error('Sync failed:', error);
    process.exit(1);
}); 