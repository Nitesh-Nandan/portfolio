import { useState } from 'react';
import { useApiCall, useApiQuery } from './use-api';
import { api } from '@/lib/api';
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
  Testimonial
} from '@shared/schema';

// Default fallback data
const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  id: 1,
  firstName: '',
  lastName: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  profileImage: '',
  resumeUrl: '',
  availability: 'available',
  availabilityMessage: '',
  updatedAt: new Date()
};

// Personal Information Hooks
export const usePersonalInfo = () => {
  return useApiCall(
    api.getPersonalInfo,
    DEFAULT_PERSONAL_INFO
  );
};

// Work Experience Hooks
export const useWorkExperience = () => {
  return useApiCall(api.getWorkExperience, []);
};

// Projects Hooks
export const useProjects = () => {
  return useApiCall(api.getProjects, []);
};

export const useFeaturedProjects = () => {
  return useApiCall(api.getFeaturedProjects, []);
};

// Skills Hooks
export const useSkills = (category?: string) => {
  return useApiCall(
    category ? () => api.getSkillsByCategory(category) : api.getSkills,
    [],
    [category]
  );
};

// Books/Learning Hooks
export const useBooks = (status?: string) => {
  return useApiCall(
    status ? () => api.getBooksByStatus(status) : api.getBooks,
    [],
    [status]
  );
};

export const useCurrentlyReadingBooks = () => {
  return useApiCall(() => api.getBooksByStatus('currently-reading'), []);
};

// Courses Hooks
export const useCourses = () => useApiQuery<Course[]>({
  queryKey: ['/api/courses'],
  queryFn: api.getCourses,
});

export const useCoursesByStatus = (status: string) => useApiQuery<Course[]>({
  queryKey: ['/api/courses', status],
  queryFn: () => api.getCoursesByStatus(status),
});

export const useFeaturedCourses = () => useApiQuery<Course[]>({
  queryKey: ['/api/courses/featured'],
  queryFn: api.getFeaturedCourses,
});

// Articles Hooks
export const useArticles = () => useApiQuery<Article[]>({
  queryKey: ['/api/articles'],
  queryFn: api.getArticles,
});

export const useArticlesByStatus = (status: string) => useApiQuery<Article[]>({
  queryKey: ['/api/articles', status],
  queryFn: () => api.getArticlesByStatus(status),
});

export const useFeaturedArticles = () => useApiQuery<Article[]>({
  queryKey: ['/api/articles/featured'],
  queryFn: api.getFeaturedArticles,
});

// Content Hooks
export const useContactContent = () => useApiCall(
  api.getContactContent,
  {
    id: 1,
    heading: 'Contact Me',
    subheading: "I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and system design.",
    formTitle: 'Send me a message',
    connectTitle: 'Connect',
    contactInfoTitle: 'Get in touch',
    statusMessage: 'Feel free to reach out if you need my skills or have an exciting project to collaborate on.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/niteshnandan',
      github: '#',
      twitter: '#',
      email: 'mailto:niteshnitp5686@gmail.com'
    }
  } as ContactContentWithParsedJson
);

export const useFooterContent = () => useApiCall(
  api.getFooterContent,
  {
    id: 1,
    quickLinksTitle: 'Quick Links',
    contactTitle: 'Get In Touch',
    copyrightText: 'All rights reserved.',
    quickLinks: [
      { label: 'Home', sectionId: 'home' },
      { label: 'My Projects', sectionId: 'projects' },
      { label: 'BookShelf', sectionId: 'bookshelf' },
      { label: 'Contact', sectionId: 'contact' }
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/niteshnandan',
      github: '#',
      twitter: '#',
      email: 'mailto:niteshnitp5686@gmail.com'
    }
  } as FooterContentWithParsedJson
);

export const useTestimonials = () => useApiCall(api.getTestimonials, []);

// Admin Hooks
export const useAdminActions = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const syncToDatabase = async () => {
    setLoading(true);
    try {
      const result = await api.admin.syncToDatabase();
      setMessage(result.message);
    } catch (error) {
      setMessage('Failed to sync to database');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const backupToJson = async () => {
    setLoading(true);
    try {
      const result = await api.admin.backupToJson();
      setMessage(result.message);
    } catch (error) {
      setMessage('Failed to backup to JSON');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePersonalInfo = async (data: Partial<PersonalInfo>) => {
    setLoading(true);
    try {
      const result = await api.admin.updatePersonalInfo(data);
      setMessage(result.message);
    } catch (error) {
      setMessage('Failed to update personal info');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    syncToDatabase,
    backupToJson,
    updatePersonalInfo,
    clearMessage: () => setMessage(null)
  };
}; 