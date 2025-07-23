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
  footerContent
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
  FooterContentWithParsedJson
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

// Generic upsert function for any table with ID
async function upsertRecords<T extends { id: number }>(
  table: any,
  records: T[],
  tableName: string
): Promise<{ updated: number; inserted: number }> {
  if (!Array.isArray(records) || records.length === 0) {
    console.log(`⚠️ No ${tableName} data to sync`);
    return { updated: 0, inserted: 0 };
  }

  let updated = 0;
  let inserted = 0;

  for (const record of records) {
    if (!record.id) {
      console.warn(`⚠️ Skipping ${tableName} record without ID`);
      continue;
    }

    const existing = await db.select().from(table).where(eq(table.id, record.id));
    
    if (existing.length > 0) {
      await db.update(table).set(record).where(eq(table.id, record.id));
      updated++;
    } else {
      await db.insert(table).values(record);
      inserted++;
    }
  }

  console.log(`✅ ${tableName} synced (${updated} updated, ${inserted} inserted, ${records.length} total)`);
  return { updated, inserted };
}

// Upsert function for single record tables
async function upsertSingleRecord<T extends { id: number }>(
  table: any,
  record: T | null,
  tableName: string
): Promise<boolean> {
  if (!record || !record.id) {
    console.log(`⚠️ No ${tableName} data to sync`);
    return false;
  }

  const existing = await db.select().from(table).where(eq(table.id, record.id));
  
  if (existing.length > 0) {
    await db.update(table).set(record).where(eq(table.id, record.id));
    console.log(`✅ ${tableName} updated`);
  } else {
    await db.insert(table).values(record);
    console.log(`✅ ${tableName} inserted`);
  }
  
  return true;
}

async function syncData() {
  console.log('🔄 Starting data synchronization...');
  console.log('📁 Syncing JSON files → Database (using upsert operations)');
  
  try {
    // Sync personal info (single record)
    const personalData = readJsonFile<PersonalInfo>('personal-info.json');
    await upsertSingleRecord(personalInfo, personalData, 'Personal Info');

    // Sync work experience (multiple records)
    const workData = readJsonFile<WorkExperience[]>('work-experience.json');
    await upsertRecords(workExperience, workData || [], 'Work Experience');

    // Sync projects (multiple records)
    const projectData = readJsonFile<Project[]>('projects.json');
    await upsertRecords(projects, projectData || [], 'Projects');

    // Sync skills (multiple records)
    const skillData = readJsonFile<Skill[]>('skills.json');
    await upsertRecords(skills, skillData || [], 'Skills');

    // Sync books (multiple records)
    const bookData = readJsonFile<Book[]>('books.json');
    await upsertRecords(books, bookData || [], 'Books');

    // Sync courses (multiple records)
    const courseData = readJsonFile<Course[]>('courses.json');
    await upsertRecords(courses, courseData || [], 'Courses');

    // Sync articles (multiple records)
    const articleData = readJsonFile<Article[]>('articles.json');
    await upsertRecords(articles, articleData || [], 'Articles');

    // Sync contact content (single record with JSON parsing)
    const contactContentData = readJsonFile<ContactContentWithParsedJson>('contact-content.json');
    if (contactContentData && contactContentData.id) {
      const contactDbData = {
        ...contactContentData,
        socialLinksJson: JSON.stringify(contactContentData.socialLinks)
      };
      delete (contactDbData as any).socialLinks; // Remove the parsed version
      
      await upsertSingleRecord(contactContent, contactDbData, 'Contact Content');
    }

    // Sync footer content (single record with JSON parsing)
    const footerContentData = readJsonFile<FooterContentWithParsedJson>('footer-content.json');
    if (footerContentData && footerContentData.id) {
      const footerDbData = {
        ...footerContentData,
        quickLinksJson: JSON.stringify(footerContentData.quickLinks),
        socialLinksJson: JSON.stringify(footerContentData.socialLinks)
      };
      delete (footerDbData as any).quickLinks; // Remove the parsed version
      delete (footerDbData as any).socialLinks; // Remove the parsed version
      
      await upsertSingleRecord(footerContent, footerDbData, 'Footer Content');
    }

    console.log('✅ Data synchronized successfully!');
    console.log('📊 All JSON data has been synced to the database using upsert operations');
    
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
        footerCount
      ] = await Promise.all([
        db.select().from(skills).then(rows => rows.length),
        db.select().from(projects).then(rows => rows.length),
        db.select().from(workExperience).then(rows => rows.length),
        db.select().from(books).then(rows => rows.length),
        db.select().from(courses).then(rows => rows.length),
        db.select().from(articles).then(rows => rows.length),
        db.select().from(contactContent).then(rows => rows.length),
        db.select().from(footerContent).then(rows => rows.length)
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