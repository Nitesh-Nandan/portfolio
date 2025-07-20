import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { PersonalInfo, WorkExperience, Project, Skill, Book, Course, Article, ContactContentWithParsedJson, FooterContentWithParsedJson } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

// Simple data fetching hook
const useApiData = <T>(
  fetchFn: () => Promise<T>,
  fallback: T,
  deps: any[] = []
) => {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch data');
          console.error('Data fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error, refetch: () => setData(fallback) };
};

// Simplified data hooks
export const usePersonalInfo = () => {
  return useApiData(
    api.getPersonalInfo,
    {
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
    } as PersonalInfo
  );
};

export const useWorkExperience = () => {
  return useApiData(api.getWorkExperience, [] as WorkExperience[]);
};

export const useProjects = () => {
  return useApiData(api.getProjects, [] as Project[]);
};

export const useFeaturedProjects = () => {
  return useApiData(api.getFeaturedProjects, [] as Project[]);
};

export const useSkills = (category?: string) => {
  return useApiData(
    category ? () => api.getSkillsByCategory(category) : api.getSkills,
    [] as Skill[],
    [category]
  );
};

export const useBooks = (status?: string) => {
  return useApiData(
    status ? () => api.getBooksByStatus(status) : api.getBooks,
    [] as Book[],
    [status]
  );
};

export const useCurrentlyReadingBooks = () => {
  return useApiData(() => api.getBooksByStatus('reading'), [] as Book[]);
};

export const useCourses = () => useQuery<Course[]>({
  queryKey: ['/api/courses'],
  queryFn: api.getCourses,
});

export const useCoursesByStatus = (status: string) => useQuery<Course[]>({
  queryKey: ['/api/courses', status],
  queryFn: () => api.getCoursesByStatus(status),
});

export const useArticles = () => useQuery<Article[]>({
  queryKey: ['/api/articles'],
  queryFn: api.getArticles,
});

export const useArticlesByStatus = (status: string) => useQuery<Article[]>({
  queryKey: ['/api/articles', status],
  queryFn: () => api.getArticlesByStatus(status),
});

// Contact Content
export const useContactContent = () => useQuery<ContactContentWithParsedJson>({
  queryKey: ['/api/contact-content'],
  queryFn: api.getContactContent,
});

// Footer Content
export const useFooterContent = () => useQuery<FooterContentWithParsedJson>({
  queryKey: ['/api/contact-content'],
  queryFn: api.getFooterContent,
});

// Admin hooks for your personal use
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