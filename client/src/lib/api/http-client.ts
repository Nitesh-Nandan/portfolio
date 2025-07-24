import { config as envConfig } from '@/config/env';
import { apiConfig } from './config';
import type { RequestOptions, ApiError } from './types';

/**
 * HTTP Client with enhanced error handling and retry logic
 */
export class HttpClient {
  private static instance: HttpClient;

  private constructor() {}

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  /**
   * Makes an HTTP request with timeout and retry logic
   */
  public async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { timeout = envConfig.api.timeout, retries = 0, ...fetchOptions } = options;
    const config = apiConfig.getConfig();
    
    const fullUrl = config.baseUrl 
      ? new URL(url, config.baseUrl).toString()
      : url;

    return this.executeWithRetry(fullUrl, fetchOptions, timeout, retries);
  }

  /**
   * Makes a static data request
   */
  public async requestStatic<T>(file: string): Promise<T> {
    const config = apiConfig.getConfig();
    const url = `${config.staticPath}/${file}`;
    
    try {
      if (import.meta.env.DEV) {
        console.log(`📁 Static Call: ${url}`);
        console.log(`📁 Config:`, config);
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`❌ Static data error: ${response.status} ${response.statusText}`);
        throw this.createApiError(response, `Static Data Error`);
      }
      
      const data = await response.json();
      if (import.meta.env.DEV) {
        console.log(`✅ Static data loaded: ${file}`, data);
      }
      return data;
    } catch (error) {
      console.error(`❌ Failed to fetch static data ${url}:`, error);
      throw error;
    }
  }

  /**
   * Executes request with retry logic
   */
  private async executeWithRetry<T>(
    url: string,
    options: RequestInit,
    timeout: number,
    retries: number
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (import.meta.env.DEV) {
          console.log(`🌐 API Call (attempt ${attempt + 1}): ${url}`);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw this.createApiError(response, `API Error`);
        }
        
        return response.json();
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on client errors (4xx) except 429 (rate limit)
        if (error instanceof Error && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500 && status !== 429) {
            throw error;
          }
        }
        
        // Don't retry on abort (timeout)
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error(`Request timeout after ${timeout}ms`);
        }
        
        // Wait before retry (exponential backoff)
        if (attempt < retries) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }

  /**
   * Creates a standardized API error
   */
  private createApiError(response: Response, prefix: string): ApiError {
    return {
      message: `${prefix}: ${response.status} ${response.statusText}`,
      status: response.status,
      code: response.statusText
    };
  }
}

// Export singleton instance
export const httpClient = HttpClient.getInstance(); 