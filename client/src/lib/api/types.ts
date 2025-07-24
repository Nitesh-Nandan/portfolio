// API Configuration Types
export interface ApiConfig {
  mode: 'static' | 'api';
  baseUrl: string;
  staticPath: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Request Options
export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

// Contact Form Data
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}

// Admin Actions
export interface AdminActionResponse {
  message: string;
  success: boolean;
  data?: any;
} 