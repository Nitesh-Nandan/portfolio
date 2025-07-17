import { apiRequest } from "@/lib/queryClient";
import type { InsertContactMessage, Project, Book } from "@shared/schema";

export const api = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    const response = await fetch('/api/projects/featured');
    if (!response.ok) {
      throw new Error('Failed to fetch featured projects');
    }
    return response.json();
  },

  // Books
  getBooks: async (): Promise<Book[]> => {
    const response = await fetch('/api/books');
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return response.json();
  },

  getBooksByStatus: async (status: string): Promise<Book[]> => {
    const response = await fetch(`/api/books/${status}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch books with status: ${status}`);
    }
    return response.json();
  },

  // Contact
  submitContactForm: async (data: InsertContactMessage) => {
    const response = await apiRequest('POST', '/api/contact', data);
    return response.json();
  }
};
