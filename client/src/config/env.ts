// Environment configuration for the client
export const config = {
  // Backend API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  },
  
  // Development Settings
  dev: {
    mode: import.meta.env.VITE_DEV_MODE === 'true',
  },
  
  // Environment
  env: {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  },
} as const;

// Type-safe environment variables
export type Config = typeof config; 