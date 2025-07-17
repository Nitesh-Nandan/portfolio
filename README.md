# Personal Portfolio - PostgreSQL Powered

A comprehensive, full-stack personal portfolio application powered by PostgreSQL, featuring a modern React frontend and robust Express.js backend with complete CRUD operations for all portfolio data.

## 🚀 Features

### Core Functionality
- **Personal Information Management** - Bio, contact details, availability status
- **Skills & Technologies** - Categorized skills with proficiency levels and experience
- **Work Experience** - Detailed employment history with achievements and tech stacks  
- **Education** - Academic background with achievements and grades
- **Professional Certifications** - Industry certifications with verification links
- **Project Portfolio** - Comprehensive project showcase with categories, tech stacks, and metrics
- **Learning & Development** - Books, courses, and continuous learning tracking
- **Blog System** - Content management with publishing, categorization, and analytics
- **Social Links** - Centralized social media and contact link management
- **Achievements & Awards** - Professional recognition and milestones
- **Testimonials** - Peer recommendations and feedback management
- **Contact System** - Enhanced contact form with categorization and tracking
- **Analytics** - User engagement and interaction tracking
- **Settings** - Configurable site settings and preferences

### Technical Features
- **PostgreSQL Database** - Comprehensive relational data model
- **RESTful API** - Complete CRUD operations for all entities
- **React Query** - Efficient data fetching and caching
- **TypeScript** - Full type safety across frontend and backend
- **Responsive Design** - Mobile-first responsive UI
- **Real-time Updates** - Optimistic updates and cache invalidation
- **Data Validation** - Zod schema validation throughout the stack
- **Database Seeding** - Rich sample data for development and testing

## 📊 Database Schema

### Core Tables
- `personal_info` - Personal details and availability
- `categories` - Content organization (skills, projects, blog)
- `skills` - Technical skills with proficiency and experience
- `education` - Academic background and achievements
- `certifications` - Professional certifications and credentials
- `projects` - Project portfolio with detailed metadata
- `courses` - Learning courses and completion tracking
- `books` - Reading list with progress and notes
- `blog_posts` - Blog content management
- `social_links` - Social media and contact links
- `work_experience` - Employment history and achievements
- `achievements` - Awards, recognition, and milestones
- `testimonials` - Peer recommendations and feedback
- `contact_messages` - Enhanced contact form submissions
- `analytics` - User interaction and engagement tracking
- `settings` - Site configuration and preferences

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Environment Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd PersonalPortfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up PostgreSQL database:
```bash
# Create a new database
createdb personal_portfolio

# Or using psql
psql -c "CREATE DATABASE personal_portfolio;"
```

4. Configure environment variables:
```bash
# Create .env file
echo "DATABASE_URL=postgresql://username:password@localhost:5432/personal_portfolio" > .env
```

### Database Migration & Seeding
```bash
# Generate and run migrations
npm run db:generate
npm run db:migrate

# Seed with comprehensive sample data
npm run seed
```

### Development
```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5000
```

### Production
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📡 API Endpoints

### Personal Information
- `GET /api/personal-info` - Get personal information
- `POST /api/personal-info` - Create personal information
- `PUT /api/personal-info/:id` - Update personal information

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories?type=skill` - Get categories by type
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills?featured=true` - Get featured skills
- `GET /api/skills?categoryId=1` - Get skills by category
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Education
- `GET /api/education` - Get education history
- `GET /api/education?current=true` - Get current education
- `POST /api/education` - Create education entry
- `PUT /api/education/:id` - Update education
- `DELETE /api/education/:id` - Delete education

### Certifications
- `GET /api/certifications` - Get all certifications
- `GET /api/certifications?active=true` - Get active certifications
- `POST /api/certifications` - Create certification
- `PUT /api/certifications/:id` - Update certification
- `DELETE /api/certifications/:id` - Delete certification

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?featured=true` - Get featured projects
- `GET /api/projects?categoryId=1` - Get projects by category
- `GET /api/projects?status=completed` - Get projects by status
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses?featured=true` - Get featured courses
- `GET /api/courses?status=in-progress` - Get courses by status
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Books
- `GET /api/books` - Get all books
- `GET /api/books?featured=true` - Get featured books
- `GET /api/books?status=currently-reading` - Get books by status
- `POST /api/books` - Create book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Blog Posts
- `GET /api/blog-posts` - Get all blog posts
- `GET /api/blog-posts?published=true` - Get published posts
- `GET /api/blog-posts?featured=true` - Get featured posts
- `GET /api/blog-posts/slug/:slug` - Get post by slug
- `POST /api/blog-posts` - Create blog post
- `PUT /api/blog-posts/:id` - Update blog post
- `DELETE /api/blog-posts/:id` - Delete blog post

### Social Links
- `GET /api/social-links` - Get all social links
- `GET /api/social-links?active=true` - Get active links
- `POST /api/social-links` - Create social link
- `PUT /api/social-links/:id` - Update social link
- `DELETE /api/social-links/:id` - Delete social link

### Work Experience
- `GET /api/work-experience` - Get work experience
- `GET /api/work-experience?current=true` - Get current position
- `POST /api/work-experience` - Create work experience
- `PUT /api/work-experience/:id` - Update work experience
- `DELETE /api/work-experience/:id` - Delete work experience

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements?featured=true` - Get featured achievements
- `POST /api/achievements` - Create achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials?featured=true` - Get featured testimonials
- `GET /api/testimonials?approved=true` - Get approved testimonials
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Contact Messages
- `POST /api/contact` - Submit contact form
- `GET /api/contact-messages` - Get contact messages
- `GET /api/contact-messages?status=new` - Get messages by status
- `PUT /api/contact-messages/:id` - Update message status
- `DELETE /api/contact-messages/:id` - Delete message

### Analytics
- `POST /api/analytics` - Create analytics event
- `GET /api/analytics` - Get analytics data
- `GET /api/analytics?event=page_view` - Get analytics by event
- `GET /api/analytics?startDate=2024-01-01&endDate=2024-12-31` - Get analytics by date range

### Settings
- `GET /api/settings` - Get all settings
- `GET /api/settings/:key` - Get specific setting
- `POST /api/settings` - Create setting
- `PUT /api/settings/:key` - Update setting
- `DELETE /api/settings/:key` - Delete setting

## 🎯 React Query Hooks

### Data Fetching Hooks
```typescript
// Personal & Portfolio Data
const { data: personalInfo } = usePersonalInfo();
const { projects } = useFeaturedProjects(3);
const { data: skills } = useFeaturedSkills();
const { books } = useCurrentlyReadingBooks(3);
const { data: workExperience } = useWorkExperience();

// Categories & Organization
const { data: skillCategories } = useSkillCategories();
const { data: projectCategories } = useProjectCategories();

// Learning & Development
const { currentlyReading, completedBooks, currentCourses } = useLearningData();

// Blog & Content
const { publishedPosts, featuredPosts } = useBlogData();
const { data: post } = useBlogPostBySlug('my-blog-post');

// Professional
const { data: certifications } = useActiveCertifications();
const { data: achievements } = useFeaturedAchievements();
const { data: testimonials } = useApprovedTestimonials();

// Utility Hooks
const portfolioData = usePortfolioData(); // Combined data for homepage
const aboutData = useAboutData(); // Combined data for about page
const learningData = useLearningData(); // Combined learning data
```

### Mutation Hooks
```typescript
// Contact Form
const submitContact = useSubmitContactMessage();
await submitContact.mutateAsync(formData);

// Personal Info Updates
const updatePersonalInfo = useUpdatePersonalInfo();
await updatePersonalInfo.mutateAsync({ id: 1, data: updatedInfo });

// Settings Management
const updateSetting = useUpdateSetting();
await updateSetting.mutateAsync({ key: 'site_title', value: 'New Title' });
```

### Analytics Tracking
```typescript
// Page View Tracking
const trackPageView = useTrackPageView();
trackPageView('/projects', { source: 'navigation' });

// Project View Tracking
const trackProjectView = useTrackProjectView();
trackProjectView(projectId, projectTitle);

// Contact Form Tracking
const trackContactSubmit = useTrackContactFormSubmit();
trackContactSubmit(true, 'contact');
```

## 🗃️ Sample Data

The seed script populates the database with comprehensive sample data:

- **Personal Information**: Complete profile with contact details and availability
- **Categories**: 10 organized categories for skills, projects, and blog content
- **Skills**: 12 technical skills with proficiency levels and experience years
- **Education**: Bachelor's degree from NIT Patna with achievements
- **Certifications**: 3 professional certifications (AWS, Oracle, Kubernetes)
- **Projects**: 3 detailed projects with metrics, challenges, and learnings
- **Courses**: 3 online courses with completion status and ratings
- **Books**: 5 books across different reading statuses with notes and quotes
- **Blog Posts**: 3 sample blog posts with SEO metadata
- **Social Links**: 4 social media and contact links
- **Work Experience**: 2 detailed employment entries with achievements
- **Achievements**: 4 professional awards and recognitions
- **Testimonials**: 3 peer recommendations with approval status
- **Contact Messages**: 2 sample contact inquiries with different statuses
- **Settings**: 8 configurable site settings
- **Analytics**: 3 sample analytics events for tracking

## 🔧 Customization

### Adding New Data Types
1. Define schema in `shared/schema.ts`
2. Add storage methods in `server/storage.ts`
3. Create API routes in `server/routes.ts`
4. Add React Query hooks in `client/src/hooks/use-data-queries.ts`
5. Update seed script in `server/seed.ts`

### Modifying Existing Tables
1. Update schema definitions
2. Generate new migration: `npm run db:generate`
3. Apply migration: `npm run db:migrate`
4. Update related components and hooks

### UI Customization
- Modify components in `client/src/components/`
- Update styling in `client/src/index.css`
- Customize UI constants in `client/src/lib/ui-constants.ts`

## 📈 Analytics & Insights

The portfolio includes built-in analytics to track:
- Page views and user navigation
- Project interactions and engagement
- Contact form submissions and conversions
- Popular content and sections
- User demographics and behavior

## 🔒 Security Features

- Input validation with Zod schemas
- SQL injection prevention with parameterized queries
- XSS protection with content sanitization
- Rate limiting for contact forms
- Environment variable protection

## 🚀 Deployment

### Database Setup
1. Create PostgreSQL database on your hosting provider
2. Update `DATABASE_URL` environment variable
3. Run migrations: `npm run db:migrate`
4. Seed data: `npm run seed`

### Application Deployment
1. Build the application: `npm run build`
2. Deploy to your hosting platform (Vercel, Netlify, Railway, etc.)
3. Set environment variables
4. Monitor application logs and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React, TypeScript, Express.js, and PostgreSQL
- UI components from shadcn/ui
- Icons from Lucide React
- Database ORM with Drizzle
- State management with React Query

---

**Happy Coding!** 🎉

For questions or support, please open an issue or contact the maintainer. 