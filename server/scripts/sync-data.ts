#!/usr/bin/env tsx
import 'dotenv/config';
import { dataService } from '../data-service';

async function syncData() {
  console.log('🔄 Starting data synchronization...');
  console.log('📁 Syncing JSON files → Database');
  
  try {
    await dataService.syncToDatabase();
    console.log('✅ Data synchronized successfully!');
    console.log('📊 All JSON data has been synced to the database');
    
    // Optional: Show summary of synced data
    try {
      const skills = await dataService.getSkills();
      const projects = await dataService.getProjects();
      const workExperience = await dataService.getWorkExperience();
      const books = await dataService.getBooks();
      
      console.log('\n📈 Sync Summary:');
      console.log(`   • Skills: ${Array.isArray(skills) ? skills.length : 0} items`);
      console.log(`   • Projects: ${Array.isArray(projects) ? projects.length : 0} items`);
      console.log(`   • Work Experience: ${Array.isArray(workExperience) ? workExperience.length : 0} items`);
      console.log(`   • Books: ${Array.isArray(books) ? books.length : 0} items`);
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