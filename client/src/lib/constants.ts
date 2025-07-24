/**
 * Application Constants
 * Centralized configuration values for the application
 */

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
} as const;

// Navigation
export const NAVIGATION = {
  ITEMS: [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Work Experience' },
    { path: '/contact', label: 'Contact' }
  ],
  BRAND_NAME: 'Nitesh Nandan',
  CONTAINER_WIDTH: 'container-width',
} as const;

// Social Media Platforms
export const SOCIAL_PLATFORMS = {
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  TWITTER: 'twitter',
  EMAIL: 'email',
} as const;

// Learning Statuses
export const LEARNING_STATUSES = {
  CURRENTLY_READING: 'currently-reading',
  COMPLETED: 'completed',
  PLANNED: 'planned',
  IN_PROGRESS: 'in-progress',
} as const;

// Skill Categories
export const SKILL_CATEGORIES = {
  BACKEND: 'backend',
  FRONTEND: 'frontend',
  DATABASE: 'database',
  DEVOPS: 'devops',
  TOOLS: 'tools',
} as const;

// UI Constants
export const UI = {
  ANIMATION_DURATION: 300,
  HOVER_SCALE: 1.05,
  SHADOW_LEVELS: {
    SM: 'shadow-md',
    MD: 'shadow-lg',
    LG: 'shadow-xl',
    XL: 'shadow-2xl',
  },
  BORDER_RADIUS: {
    SM: 'rounded',
    MD: 'rounded-lg',
    LG: 'rounded-xl',
    XL: 'rounded-2xl',
  },
} as const;

// Color Schemes
export const COLORS = {
  PRIMARY: {
    BLUE: 'blue-600',
    BLUE_HOVER: 'blue-700',
    BLUE_LIGHT: 'blue-50',
    BLUE_BORDER: 'blue-500',
  },
  GRAY: {
    50: 'gray-50',
    100: 'gray-100',
    500: 'gray-500',
    600: 'gray-600',
    700: 'gray-700',
    900: 'gray-900',
  },
  SOCIAL: {
    LINKEDIN: {
      BG: 'bg-blue-50',
      TEXT: 'text-blue-600',
      HOVER_BG: 'hover:bg-blue-100',
      HOVER_TEXT: 'hover:text-blue-700',
    },
    GITHUB: {
      BG: 'bg-gray-50',
      TEXT: 'text-gray-700',
      HOVER_BG: 'hover:bg-gray-100',
      HOVER_TEXT: 'hover:text-gray-900',
    },
    TWITTER: {
      BG: 'bg-sky-50',
      TEXT: 'text-sky-600',
      HOVER_BG: 'hover:bg-sky-100',
      HOVER_TEXT: 'hover:text-sky-700',
    },
    EMAIL: {
      BG: 'bg-green-50',
      TEXT: 'text-green-600',
      HOVER_BG: 'hover:bg-green-100',
      HOVER_TEXT: 'hover:text-green-700',
    },
  },
} as const;

// Layout Constants
export const LAYOUT = {
  CONTAINER_WIDTH: 'container-width',
  MAX_WIDTH: {
    SM: 'max-w-sm',
    MD: 'max-w-md',
    LG: 'max-w-lg',
    XL: 'max-w-xl',
    '2XL': 'max-w-2xl',
    '4XL': 'max-w-4xl',
  },
  SPACING: {
    SECTION: 'py-20',
    HERO_TOP: 'pt-32',
    HERO_BOTTOM: 'pb-20',
  },
} as const;

// Default Values
export const DEFAULTS = {
  PROFILE_IMAGE: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  EMAIL: 'niteshnitp5686@gmail.com',
  SKILLS_COUNT: 12,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data',
  LOAD_FAILED: 'Failed to load data',
  PROFILE_LOAD_FAILED: 'Failed to load profile information',
  SKILLS_LOAD_FAILED: 'Failed to load skills',
  PROJECTS_LOAD_FAILED: 'Failed to load projects',
  CONTACT_SUBMIT_FAILED: 'Failed to submit contact form',
  ADMIN_SYNC_FAILED: 'Failed to sync to database',
  ADMIN_BACKUP_FAILED: 'Failed to backup to JSON',
  ADMIN_UPDATE_FAILED: 'Failed to update personal info',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CONTACT_SUBMITTED: 'Thank you for your message! I will get back to you soon.',
  ADMIN_SYNC_SUCCESS: 'Successfully synced to database',
  ADMIN_BACKUP_SUCCESS: 'Successfully backed up to JSON',
  ADMIN_UPDATE_SUCCESS: 'Successfully updated personal info',
} as const; 