import { useQuery } from "@tanstack/react-query";
import type { Project, Book } from "@shared/schema";

/**
 * Hook for fetching featured projects
 */
export function useFeaturedProjects(limit: number = 3) {
  const { data: allProjects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const featuredProjects = allProjects?.filter(project => project.featured).slice(0, limit) || [];

  return {
    projects: featuredProjects,
    isLoading,
    error,
    isEmpty: !isLoading && featuredProjects.length === 0,
  };
}

/**
 * Hook for fetching currently reading books
 */
export function useCurrentlyReadingBooks(limit: number = 3) {
  const { data: books, isLoading, error } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  const currentlyReading = books?.filter(book => book.status === 'currently-reading').slice(0, limit) || [];

  return {
    books: currentlyReading,
    isLoading,
    error,
    isEmpty: !isLoading && currentlyReading.length === 0,
  };
} 