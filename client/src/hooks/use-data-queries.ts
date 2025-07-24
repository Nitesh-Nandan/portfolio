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
  updatedAt: new Date(),
  isDeleted: false
};

// Personal Information Hooks
export const usePersonalInfo = () => {
  console.log('🔍 usePersonalInfo hook called');
  const result = useApiCall(
    api.getPersonalInfo,
    DEFAULT_PERSONAL_INFO
  );
  console.log('🔍 usePersonalInfo result:', result);
  return result;
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
export const useCourses = () => useApiQuery<Course[]>(
  ['/api/courses'],
  api.getCourses
);

export const useCoursesByStatus = (status: string) => useApiQuery<Course[]>(
  ['/api/courses', status],
  () => api.getCoursesByStatus(status)
);

export const useFeaturedCourses = () => useApiQuery<Course[]>(
  ['/api/courses/featured'],
  api.getFeaturedCourses
);

// Articles Hooks
export const useArticles = () => useApiQuery<Article[]>(
  ['/api/articles'],
  api.getArticles
);

export const useArticlesByStatus = (status: string) => useApiQuery<Article[]>(
  ['/api/articles', status],
  () => api.getArticlesByStatus(status)
);

export const useFeaturedArticles = () => useApiQuery<Article[]>(
  ['/api/articles/featured'],
  api.getFeaturedArticles
);

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
    isDeleted: false,
    quickLinks: [
      { label: 'Home', path: '/' },
      { label: 'Projects', path: '/projects' },
      { label: 'Experience', path: '/experience' },
      { label: 'Contact', path: '/contact' }
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/niteshnandan',
      github: 'https://github.com/Nitesh-Nandan/',
      twitter: 'https://x.com/TryNitesh',
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