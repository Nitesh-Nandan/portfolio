import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  Project, Book, WorkExperience, ContactMessage, PersonalInfo, Category, Skill, 
  Education, Certification, Course, BlogPost, SocialLink, Achievement, 
  Testimonial, Analytics, Setting
} from "@shared/schema";

// Base API function
const apiRequest = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Personal Info Hooks
export const usePersonalInfo = () => {
  return useQuery<PersonalInfo>({
    queryKey: ['/api/personal-info'],
    queryFn: () => apiRequest('/api/personal-info'),
  });
};

export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PersonalInfo> }) =>
      apiRequest(`/api/personal-info/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personal-info'] });
    },
  });
};

// Category Hooks
export const useCategories = (type?: string) => {
  return useQuery<Category[]>({
    queryKey: ['/api/categories', { type }],
    queryFn: () => apiRequest(`/api/categories${type ? `?type=${type}` : ''}`),
  });
};

export const useSkillCategories = () => {
  return useCategories('skill');
};

export const useProjectCategories = () => {
  return useCategories('project');
};

export const useBlogCategories = () => {
  return useCategories('blog');
};

// Skill Hooks
export const useSkills = (featured?: boolean, categoryId?: number) => {
  const params = new URLSearchParams();
  if (featured) params.append('featured', 'true');
  if (categoryId) params.append('categoryId', categoryId.toString());
  
  return useQuery<Skill[]>({
    queryKey: ['/api/skills', { featured, categoryId }],
    queryFn: () => apiRequest(`/api/skills${params.toString() ? `?${params.toString()}` : ''}`),
  });
};

export const useFeaturedSkills = () => {
  return useSkills(true);
};

export const useSkillsByCategory = (categoryId: number) => {
  return useSkills(false, categoryId);
};

// Education Hooks
export const useEducation = (current?: boolean) => {
  return useQuery<Education[]>({
    queryKey: ['/api/education', { current }],
    queryFn: () => apiRequest(`/api/education${current ? '?current=true' : ''}`),
  });
};

export const useCurrentEducation = () => {
  return useEducation(true);
};

// Certification Hooks
export const useCertifications = (active?: boolean) => {
  return useQuery<Certification[]>({
    queryKey: ['/api/certifications', { active }],
    queryFn: () => apiRequest(`/api/certifications${active ? '?active=true' : ''}`),
  });
};

export const useActiveCertifications = () => {
  return useCertifications(true);
};

// Enhanced Project Hooks
export const useProjects = (featured?: boolean, categoryId?: number, status?: string) => {
  const params = new URLSearchParams();
  if (featured) params.append('featured', 'true');
  if (categoryId) params.append('categoryId', categoryId.toString());
  if (status) params.append('status', status);
  
  return useQuery<Project[]>({
    queryKey: ['/api/projects', { featured, categoryId, status }],
    queryFn: () => apiRequest(`/api/projects${params.toString() ? `?${params.toString()}` : ''}`),
  });
};

export const useFeaturedProjects = (limit?: number) => {
  const { data: projects, isLoading, error } = useProjects(true);
  
  return {
    projects: limit && projects ? projects.slice(0, limit) : projects || [],
    isLoading,
    error,
    isEmpty: !isLoading && (!projects || projects.length === 0)
  };
};

export const useProjectsByCategory = (categoryId: number) => {
  return useProjects(false, categoryId);
};

export const useProjectsByStatus = (status: string) => {
  return useProjects(false, undefined, status);
};

// Course Hooks
export const useCourses = (featured?: boolean, status?: string) => {
  const params = new URLSearchParams();
  if (featured) params.append('featured', 'true');
  if (status) params.append('status', status);
  
  return useQuery<Course[]>({
    queryKey: ['/api/courses', { featured, status }],
    queryFn: () => apiRequest(`/api/courses${params.toString() ? `?${params.toString()}` : ''}`),
  });
};

export const useFeaturedCourses = () => {
  return useCourses(true);
};

export const useCoursesByStatus = (status: string) => {
  return useCourses(false, status);
};

export const useCurrentCourses = () => {
  return useCoursesByStatus('in-progress');
};

export const useCompletedCourses = () => {
  return useCoursesByStatus('completed');
};

// Enhanced Book Hooks
export const useBooks = (featured?: boolean, status?: string) => {
  const params = new URLSearchParams();
  if (featured) params.append('featured', 'true');
  if (status) params.append('status', status);
  
  return useQuery<Book[]>({
    queryKey: ['/api/books', { featured, status }],
    queryFn: () => apiRequest(`/api/books${params.toString() ? `?${params.toString()}` : ''}`),
  });
};

export const useFeaturedBooks = () => {
  return useBooks(true);
};

export const useBooksByStatus = (status: string) => {
  return useBooks(false, status);
};

export const useCurrentlyReadingBooks = (limit?: number) => {
  const { data: books, isLoading, error } = useBooksByStatus('currently-reading');
  
  return {
    books: limit && books ? books.slice(0, limit) : books || [],
    isLoading,
    error,
    isEmpty: !isLoading && (!books || books.length === 0)
  };
};

export const useWantToReadBooks = () => {
  return useBooksByStatus('want-to-read');
};

export const useCompletedBooks = () => {
  return useBooksByStatus('completed');
};

// Blog Post Hooks
export const useBlogPosts = (published?: boolean, featured?: boolean) => {
  const params = new URLSearchParams();
  if (published) params.append('published', 'true');
  if (featured) params.append('featured', 'true');
  
  return useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts', { published, featured }],
    queryFn: () => apiRequest(`/api/blog-posts${params.toString() ? `?${params.toString()}` : ''}`),
  });
};

export const usePublishedBlogPosts = () => {
  return useBlogPosts(true);
};

export const useFeaturedBlogPosts = () => {
  return useBlogPosts(false, true);
};

export const useBlogPostBySlug = (slug: string) => {
  return useQuery<BlogPost>({
    queryKey: ['/api/blog-posts/slug', slug],
    queryFn: () => apiRequest(`/api/blog-posts/slug/${slug}`),
    enabled: !!slug,
  });
};

// Social Links Hooks
export const useSocialLinks = (active?: boolean) => {
  return useQuery<SocialLink[]>({
    queryKey: ['/api/social-links', { active }],
    queryFn: () => apiRequest(`/api/social-links${active ? '?active=true' : ''}`),
  });
};

export const useActiveSocialLinks = () => {
  return useSocialLinks(true);
};

// Work Experience Hooks
export const useWorkExperience = (current?: boolean) => {
  return useQuery<WorkExperience[]>({
    queryKey: ['/api/work-experience', { current }],
    queryFn: () => apiRequest(`/api/work-experience${current ? '?current=true' : ''}`),
  });
};

export const useCurrentWorkExperience = () => {
  return useWorkExperience(true);
};

// Achievement Hooks
export const useAchievements = (featured?: boolean) => {
  return useQuery<Achievement[]>({
    queryKey: ['/api/achievements', { featured }],
    queryFn: () => apiRequest(`/api/achievements${featured ? '?featured=true' : ''}`),
  });
};

export const useFeaturedAchievements = () => {
  return useAchievements(true);
};

// Testimonial Hooks
export const useTestimonials = (featured?: boolean, approved?: boolean) => {
  const params = new URLSearchParams();
  if (featured) params.append('featured', 'true');
  if (approved) params.append('approved', 'true');
  
  return useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials', { featured, approved }],
    queryFn: () => apiRequest(`/api/testimonials${params.toString() ? `?${params.toString()}` : ''}`),
  });
};

export const useFeaturedTestimonials = () => {
  return useTestimonials(true);
};

export const useApprovedTestimonials = () => {
  return useTestimonials(false, true);
};

// Contact Message Hooks
export const useContactMessages = (status?: string) => {
  return useQuery<ContactMessage[]>({
    queryKey: ['/api/contact-messages', { status }],
    queryFn: () => apiRequest(`/api/contact-messages${status ? `?status=${status}` : ''}`),
  });
};

export const useContactMessagesByStatus = (status: string) => {
  return useContactMessages(status);
};

export const useSubmitContactMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) =>
      apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-messages'] });
    },
  });
};

// Analytics Hooks
export const useAnalytics = (event?: string, startDate?: string, endDate?: string) => {
  const params = new URLSearchParams();
  if (event) params.append('event', event);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  return useQuery<Analytics[]>({
    queryKey: ['/api/analytics', { event, startDate, endDate }],
    queryFn: () => apiRequest(`/api/analytics${params.toString() ? `?${params.toString()}` : ''}`),
  });
};

export const useAnalyticsByEvent = (event: string) => {
  return useAnalytics(event);
};

export const useCreateAnalytics = () => {
  return useMutation({
    mutationFn: (data: any) =>
      apiRequest('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
};

// Settings Hooks
export const useSettings = () => {
  return useQuery<Setting[]>({
    queryKey: ['/api/settings'],
    queryFn: () => apiRequest('/api/settings'),
  });
};

export const useSetting = (key: string) => {
  return useQuery<Setting>({
    queryKey: ['/api/settings', key],
    queryFn: () => apiRequest(`/api/settings/${key}`),
    enabled: !!key,
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      apiRequest(`/api/settings/${key}`, {
        method: 'PUT',
        body: JSON.stringify({ value }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
    },
  });
};

// Utility Hooks for Portfolio Sections
export const usePortfolioData = () => {
  const personalInfo = usePersonalInfo();
  const featuredProjects = useFeaturedProjects(3);
  const featuredSkills = useFeaturedSkills();
  const currentlyReading = useCurrentlyReadingBooks(3);
  const workExperience = useWorkExperience();
  const socialLinks = useActiveSocialLinks();
  const featuredTestimonials = useFeaturedTestimonials();
  const featuredAchievements = useFeaturedAchievements();
  
  return {
    personalInfo: personalInfo.data,
    projects: featuredProjects.projects,
    skills: featuredSkills.data || [],
    books: currentlyReading.books,
    workExperience: workExperience.data || [],
    socialLinks: socialLinks.data || [],
    testimonials: featuredTestimonials.data || [],
    achievements: featuredAchievements.data || [],
    isLoading: personalInfo.isLoading || featuredProjects.isLoading || featuredSkills.isLoading,
    error: personalInfo.error || featuredProjects.error || featuredSkills.error
  };
};

export const useBlogData = () => {
  const publishedPosts = usePublishedBlogPosts();
  const featuredPosts = useFeaturedBlogPosts();
  const categories = useBlogCategories();
  
  return {
    publishedPosts: publishedPosts.data || [],
    featuredPosts: featuredPosts.data || [],
    categories: categories.data || [],
    isLoading: publishedPosts.isLoading || featuredPosts.isLoading,
    error: publishedPosts.error || featuredPosts.error
  };
};

export const useAboutData = () => {
  const personalInfo = usePersonalInfo();
  const skills = useSkills();
  const education = useEducation();
  const certifications = useActiveCertifications();
  const workExperience = useWorkExperience();
  const achievements = useAchievements();
  
  return {
    personalInfo: personalInfo.data,
    skills: skills.data || [],
    education: education.data || [],
    certifications: certifications.data || [],
    workExperience: workExperience.data || [],
    achievements: achievements.data || [],
    isLoading: personalInfo.isLoading || skills.isLoading || education.isLoading,
    error: personalInfo.error || skills.error || education.error
  };
};

export const useLearningData = () => {
  const currentlyReading = useCurrentlyReadingBooks();
  const wantToRead = useWantToReadBooks();
  const completed = useCompletedBooks();
  const currentCourses = useCurrentCourses();
  const completedCourses = useCompletedCourses();
  
  return {
    currentlyReading: currentlyReading.books,
    wantToRead: wantToRead.data || [],
    completedBooks: completed.data || [],
    currentCourses: currentCourses.data || [],
    completedCourses: completedCourses.data || [],
    isLoading: currentlyReading.isLoading || wantToRead.isLoading || currentCourses.isLoading,
    error: currentlyReading.error || wantToRead.error || currentCourses.error
  };
};

// Analytics tracking hooks
export const useTrackPageView = () => {
  const createAnalytics = useCreateAnalytics();
  
  return (page: string, additionalData?: Record<string, any>) => {
    createAnalytics.mutate({
      event: 'page_view',
      page,
      data: {
        timestamp: new Date().toISOString(),
        ...additionalData
      },
      userAgent: navigator.userAgent,
      sessionId: sessionStorage.getItem('sessionId') || 'anonymous'
    });
  };
};

export const useTrackProjectView = () => {
  const createAnalytics = useCreateAnalytics();
  
  return (projectId: number, projectTitle: string) => {
    createAnalytics.mutate({
      event: 'project_view',
      page: '/projects',
      data: {
        project_id: projectId,
        project_title: projectTitle,
        timestamp: new Date().toISOString()
      },
      userAgent: navigator.userAgent,
      sessionId: sessionStorage.getItem('sessionId') || 'anonymous'
    });
  };
};

export const useTrackContactFormSubmit = () => {
  const createAnalytics = useCreateAnalytics();
  
  return (success: boolean, formType: string = 'contact') => {
    createAnalytics.mutate({
      event: 'contact_form_submit',
      page: '/contact',
      data: {
        form_type: formType,
        success,
        timestamp: new Date().toISOString()
      },
      userAgent: navigator.userAgent,
      sessionId: sessionStorage.getItem('sessionId') || 'anonymous'
    });
  };
}; 