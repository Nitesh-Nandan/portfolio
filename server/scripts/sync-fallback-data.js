const fs = require('fs');
const path = require('path');

// Import database connection and schema
const { Pool } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');

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

        const dataDir = path.join(__dirname, '..', 'data');

        // Ensure data directory exists
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Sync Personal Info
        console.log('📄 Syncing personal information...');
        const personalInfoData = await db.execute(
            'SELECT * FROM personal_info WHERE is_deleted = false ORDER BY id LIMIT 1'
        );
        if (personalInfoData.rows.length > 0) {
            const personalInfo = transformPersonalInfo(personalInfoData.rows[0]);
            writeJsonFile(dataDir, 'personal-info.json', personalInfo);
        }

        // Sync Categories
        console.log('📂 Syncing categories...');
        const categoriesData = await db.execute(
            'SELECT * FROM categories WHERE is_deleted = false ORDER BY name'
        );
        const categories = categoriesData.rows.map(row => transformCategory(row));
        writeJsonFile(dataDir, 'categories.json', categories);

        // Sync Skills
        console.log('🛠️ Syncing skills...');
        const skillsData = await db.execute(
            'SELECT * FROM skills WHERE is_deleted = false ORDER BY "order", name'
        );
        const skills = skillsData.rows.map(row => transformSkill(row));
        writeJsonFile(dataDir, 'skills.json', skills);

        // Sync Work Experience
        console.log('💼 Syncing work experience...');
        const workExpData = await db.execute(
            'SELECT * FROM work_experience WHERE is_deleted = false ORDER BY "order", start_date DESC'
        );
        const workExperience = workExpData.rows.map(row => transformWorkExperience(row));
        writeJsonFile(dataDir, 'work-experience.json', workExperience);

        // Sync Books
        console.log('📚 Syncing books...');
        const booksData = await db.execute(
            'SELECT * FROM books WHERE is_deleted = false ORDER BY featured DESC, start_date DESC'
        );
        const books = booksData.rows.map(row => transformBook(row));
        writeJsonFile(dataDir, 'books.json', books);

        // Sync Projects (if needed)
        console.log('🚀 Syncing projects...');
        const projectsData = await db.execute(
            'SELECT * FROM projects WHERE is_deleted = false ORDER BY featured DESC, "order"'
        );
        const projects = projectsData.rows.map(row => transformProject(row));
        writeJsonFile(dataDir, 'projects.json', projects);

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
    const filePath = path.join(dir, filename);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
    console.log(`   ✓ Updated ${filename}`);
}

// Data transformation functions to match expected JSON structure
function transformPersonalInfo(row) {
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        title: row.title,
        bio: row.bio,
        email: row.email,
        phone: row.phone,
        location: row.location,
        profileImage: row.profile_image,
        resumeUrl: row.resume_url,
        availability: row.availability,
        availabilityMessage: row.availability_message,
        is_deleted: row.is_deleted
    };
}

function transformCategory(row) {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        color: row.color,
        icon: row.icon,
        type: row.type,
        is_deleted: row.is_deleted
    };
}

function transformSkill(row) {
    return {
        id: row.id,
        name: row.name,
        proficiency: row.proficiency,
        categoryId: row.category_id,
        yearsExperience: row.years_experience,
        description: row.description,
        icon: row.icon,
        color: row.color,
        featured: row.featured,
        order: row.order,
        is_deleted: row.is_deleted
    };
}

function transformWorkExperience(row) {
    return {
        id: row.id,
        company: row.company,
        position: row.position,
        department: row.department,
        location: row.location,
        workType: row.work_type,
        remote: row.remote,
        startDate: row.start_date,
        endDate: row.end_date,
        description: row.description,
        achievements: row.achievements || [],
        technologies: row.technologies || [],
        projects: row.projects || [],
        teamSize: row.team_size,
        reportingTo: row.reporting_to,
        companyWebsite: row.company_website,
        companyLogo: row.company_logo,
        isCurrent: row.is_current,
        order: row.order,
        is_deleted: row.is_deleted
    };
}

function transformBook(row) {
    return {
        id: row.id,
        title: row.title,
        author: row.author,
        isbn: row.isbn,
        image: row.image,
        rating: row.rating,
        status: row.status,
        progress: row.progress,
        startDate: row.start_date,
        completedDate: row.completed_date,
        notes: row.notes,
        quotes: row.quotes || [],
        tags: row.tags || [],
        recommendedBy: row.recommended_by,
        genre: row.genre,
        pages: row.pages,
        featured: row.featured,
        is_deleted: row.is_deleted
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
        is_deleted: row.is_deleted
    };
}

// Run the sync function
syncFallbackData().catch((error) => {
    console.error('Sync failed:', error);
    process.exit(1);
}); 