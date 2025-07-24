// UI Constants for consistent styling across components

export const CARD_STYLES = {
  base: "bg-white rounded-lg hover:shadow-md transition-shadow duration-200 h-full relative z-10",
  content: "p-6",
} as const;

export const ICON_CONTAINER_STYLES = {
  base: "p-3 rounded-lg flex-shrink-0",
} as const;

export const LOADING_STYLES = {
  container: "space-y-4",
  spinner: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300",
  center: "flex justify-center",
} as const;

export const GRID_STYLES = {
  responsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
} as const;

export const TYPOGRAPHY_STYLES = {
  cardTitle: "font-semibold text-gray-900 text-xl leading-tight mb-2",
  cardSubtitle: "text-gray-600 text-sm leading-relaxed mb-6",
  emptyState: "text-gray-500",
} as const;

export const BADGE_STYLES = {
  base: "text-xs px-2 py-1 rounded-md",
  technology: "bg-gray-100 text-gray-700 border-gray-200",
  reading: "bg-green-50 text-green-700 border-green-200",
} as const;

export const BUTTON_STYLES = {
  base: "text-xs px-4 py-2 h-auto flex-1",
  demo: "bg-blue-600 hover:bg-blue-700 text-white",
  code: "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
} as const;


export const EMPTY_STATE_STYLES = {
  container: "text-center py-8 col-span-full",
  icon: "h-16 w-16 text-gray-300 mx-auto mb-4",
} as const;

export const PROJECT_THEMES = {
  backend: {
    background: "bg-blue-50",
    text: "text-blue-600",
    keywords: ['api', 'backend'],
  },
  cloud: {
    background: "bg-purple-50", 
    text: "text-purple-600",
    keywords: ['cloud', 'aws'],
  },
  default: {
    background: "bg-amber-50",
    text: "text-amber-600",
    keywords: [],
  },
} as const;

export const READING_THEME = {
  background: "bg-green-50",
  text: "text-green-600",
} as const; 