import { config as envConfig } from '@/config/env';
import type { ApiConfig } from './types';

/**
 * API Configuration Manager
 * Centralizes all API-related configuration and provides type-safe access
 */
export class ApiConfiguration {
  private static instance: ApiConfiguration;
  private config: ApiConfig;

  private constructor() {
    this.config = this.initializeConfig();
  }

  public static getInstance(): ApiConfiguration {
    if (!ApiConfiguration.instance) {
      ApiConfiguration.instance = new ApiConfiguration();
    }
    return ApiConfiguration.instance;
  }

  private initializeConfig(): ApiConfig {
    const mode = import.meta.env.VITE_API_MODE || 'static';
    const baseUrl = envConfig.api.baseUrl;
    const staticPath = import.meta.env.VITE_STATIC_DATA_PATH || '/data';
    
    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log('🔍 API Configuration:', {
        mode,
        baseUrl,
        staticPath
      });
    }
    
    return {
      mode: mode as 'static' | 'api',
      baseUrl: baseUrl.replace(/\/$/, ''), // Remove trailing slash
      staticPath: staticPath.replace(/\/$/, '') // Remove trailing slash
    };
  }

  public getConfig(): ApiConfig {
    return { ...this.config };
  }

  public isStaticMode(): boolean {
    return this.config.mode === 'static';
  }

  public isApiMode(): boolean {
    return this.config.mode === 'api';
  }

  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getStaticPath(): string {
    return this.config.staticPath;
  }

  public getContactUrl(): string {
    return envConfig.api.contactUrl;
  }

}

// Export singleton instance
export const apiConfig = ApiConfiguration.getInstance(); 