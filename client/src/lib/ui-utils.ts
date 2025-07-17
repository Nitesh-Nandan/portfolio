import { Database, Cloud, Zap, type LucideIcon } from "lucide-react";
import { PROJECT_THEMES, ICON_CONTAINER_STYLES, READING_THEME } from "./ui-constants";

export type ProjectTheme = typeof PROJECT_THEMES[keyof typeof PROJECT_THEMES];

/**
 * Get project icon based on title keywords
 */
export function getProjectIcon(title: string): LucideIcon {
  const lowerTitle = title.toLowerCase();
  
  if (PROJECT_THEMES.backend.keywords.some(keyword => lowerTitle.includes(keyword))) {
    return Database;
  }
  if (PROJECT_THEMES.cloud.keywords.some(keyword => lowerTitle.includes(keyword))) {
    return Cloud;
  }
  return Zap;
}

/**
 * Get project theme based on title keywords
 */
export function getProjectTheme(title: string): ProjectTheme {
  const lowerTitle = title.toLowerCase();
  
  if (PROJECT_THEMES.backend.keywords.some(keyword => lowerTitle.includes(keyword))) {
    return PROJECT_THEMES.backend;
  }
  if (PROJECT_THEMES.cloud.keywords.some(keyword => lowerTitle.includes(keyword))) {
    return PROJECT_THEMES.cloud;
  }
  return PROJECT_THEMES.default;
}

/**
 * Generate icon container styles for projects
 */
export function getProjectIconStyles(title: string): string {
  const theme = getProjectTheme(title);
  return `${ICON_CONTAINER_STYLES.base} ${theme.background} ${theme.text}`;
}

/**
 * Generate icon container styles for reading section
 */
export function getReadingIconStyles(): string {
  return `${ICON_CONTAINER_STYLES.base} ${READING_THEME.background} ${READING_THEME.text}`;
}

/**
 * Combine CSS classes safely
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
} 