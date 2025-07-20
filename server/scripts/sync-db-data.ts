#!/usr/bin/env tsx
import 'dotenv/config';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { 
  personalInfo, 
  workExperience, 
  projects, 
  skills, 
  books, 
  courses, 
  articles, 
  contactContent, 
  footerContent, 
  categories 
} from '@shared/schema';
import type { 
  PersonalInfo, 
  WorkExperience, 
  Project, 
  Skill, 
  Book, 
  Course, 
  Article, 
  ContactContentWithParsedJson, 
  FooterContentWithParsedJson, 
  Category 
} from '@shared/schema';

const dataPath = join(dirname(fileURLToPath(import.meta.url)), '../data/db');

// Direct JSON file reading without fallback logic
function readJsonFile<T>(filename: string): T | null {
  try {
    const filePath = join(dataPath, filename);
    if (!existsSync(filePath)) {
      console.warn(`❌ File ${filename} doesn't exist, skipping`);
      return null;
    }

    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    console.log(`✅ Successfully read ${filename}`);
    return data;
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error);
    return null;
  }
}

async function syncData() {
  console.log('🔄 Starting data synchronization...');
  console.log('📁 Syncing JSON files → Database');
  
  try {
    // Sync personal info
    const personalData = readJsonFile<PersonalInfo>('personal-info.json');
    if (personalData && personalData.id) {
      const existing = await db.select().from(personalInfo).where(eq(personalInfo.id, personalData.id));
      if (existing.length > 0) {
        await db.update(personalInfo).set(personalData).where(eq(personalInfo.id, personalData.id));
        console.log('✅ Personal info updated');
      } else {
        await db.insert(personalInfo).values(personalData);
        console.log('✅ Personal info inserted');
      }
    }

    // Sync work experience
    const workData = readJsonFile<WorkExperience[]>('work-experience.json');
    if (Array.isArray(workData) && workData.length > 0) {
      await db.delete(workExperience);
      await db.insert(workExperience).values(workData);
      console.log(`✅ Work experience synced (${workData.length} records)`);
    }

    // Sync projects
    const projectData = readJsonFile<Project[]>('projects.json');
    if (Array.isArray(projectData) && projectData.length > 0) {
      await db.delete(projects);
      await db.insert(projects).values(projectData);
      console.log(`✅ Projects synced (${projectData.length} records)`);
    }

    // Sync skills
    const skillData = readJsonFile<Skill[]>('skills.json');
    if (Array.isArray(skillData) && skillData.length > 0) {
      await db.delete(skills);
      await db.insert(skills).values(skillData);
      console.log(`✅ Skills synced (${skillData.length} records)`);
    }

    // Sync books
    const bookData = readJsonFile<Book[]>('books.json');
    if (Array.isArray(bookData) && bookData.length > 0) {
      await db.delete(books);
      await db.insert(books).values(bookData);
      console.log(`✅ Books synced (${bookData.length} records)`);
    }

    // Sync courses
    const courseData = readJsonFile<Course[]>('courses.json');
    if (Array.isArray(courseData) && courseData.length > 0) {
      await db.delete(courses);
      await db.insert(courses).values(courseData);
      console.log(`✅ Courses synced (${courseData.length} records)`);
    }

    // Sync articles
    const articleData = readJsonFile<Article[]>('articles.json');
    if (Array.isArray(articleData) && articleData.length > 0) {
      await db.delete(articles);
      await db.insert(articles).values(articleData);
      console.log(`✅ Articles synced (${articleData.length} records)`);
    }

    // Sync contact content
    const contactContentData = readJsonFile<ContactContentWithParsedJson>('contact-content.json');
    if (contactContentData && contactContentData.id) {
      const contactDbData = {
        ...contactContentData,
        socialLinksJson: JSON.stringify(contactContentData.socialLinks)
      };
      delete (contactDbData as any).socialLinks; // Remove the parsed version
      
      const existingContact = await db.select().from(contactContent).where(eq(contactContent.id, contactContentData.id));
      if (existingContact.length > 0) {
        await db.update(contactContent).set(contactDbData).where(eq(contactContent.id, contactContentData.id));
        console.log('✅ Contact content updated');
      } else {
        await db.insert(contactContent).values(contactDbData);
        console.log('✅ Contact content inserted');
      }
    }

    // Sync footer content
    const footerContentData = readJsonFile<FooterContentWithParsedJson>('footer-content.json');
    if (footerContentData && footerContentData.id) {
      const footerDbData = {
        ...footerContentData,
        quickLinksJson: JSON.stringify(footerContentData.quickLinks),
        socialLinksJson: JSON.stringify(footerContentData.socialLinks)
      };
      delete (footerDbData as any).quickLinks; // Remove the parsed version
      delete (footerDbData as any).socialLinks; // Remove the parsed version
      
      const existingFooter = await db.select().from(footerContent).where(eq(footerContent.id, footerContentData.id));
      if (existingFooter.length > 0) {
        await db.update(footerContent).set(footerDbData).where(eq(footerContent.id, footerContentData.id));
        console.log('✅ Footer content updated');
      } else {
        await db.insert(footerContent).values(footerDbData);
        console.log('✅ Footer content inserted');
      }
    }

    // Sync categories
    const categoryData = readJsonFile<Category[]>('categories.json');
    if (Array.isArray(categoryData) && categoryData.length > 0) {
      await db.delete(categories);
      await db.insert(categories).values(categoryData);
      console.log(`✅ Categories synced (${categoryData.length} records)`);
    }

    console.log('✅ Data synchronized successfully!');
    console.log('📊 All JSON data has been synced to the database');
    
    // Show summary by counting records directly from database
    try {
      const [
        skillsCount,
        projectsCount,
        workExperienceCount,
        booksCount,
        coursesCount,
        articlesCount,
        contactCount,
        footerCount,
        categoriesCount
      ] = await Promise.all([
        db.select().from(skills).then(rows => rows.length),
        db.select().from(projects).then(rows => rows.length),
        db.select().from(workExperience).then(rows => rows.length),
        db.select().from(books).then(rows => rows.length),
        db.select().from(courses).then(rows => rows.length),
        db.select().from(articles).then(rows => rows.length),
        db.select().from(contactContent).then(rows => rows.length),
        db.select().from(footerContent).then(rows => rows.length),
        db.select().from(categories).then(rows => rows.length)
      ]);
      
      console.log('\n📈 Sync Summary:');
      console.log(`   • Skills: ${skillsCount} items`);
      console.log(`   • Projects: ${projectsCount} items`);
      console.log(`   • Work Experience: ${workExperienceCount} items`);
      console.log(`   • Books: ${booksCount} items`);
      console.log(`   • Courses: ${coursesCount} items`);
      console.log(`   • Articles: ${articlesCount} items`);
      console.log(`   • Contact Content: ${contactCount} item`);
      console.log(`   • Footer Content: ${footerCount} item`);
      console.log(`   • Categories: ${categoriesCount} items`);
    } catch (summaryError) {
      console.log('📊 Data synced (summary unavailable)');
    }
    
  } catch (error) {
    console.error('❌ Error during data synchronization:', error);
    process.exit(1);
  }
}

// Run the sync if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  syncData().then(() => {
    console.log('🎉 Sync operation completed!');
    process.exit(0);
  }).catch((error) => {
    console.error('💥 Sync operation failed:', error);
    process.exit(1);
  });
}

export { syncData }; 