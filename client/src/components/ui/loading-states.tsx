import { LoadingSpinner } from './loading-spinner';
import { Skeleton } from './skeleton';

/**
 * Loading state for data fetching
 */
export function DataLoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}

/**
 * Error state for data fetching
 */
export function DataErrorState({ 
  message = 'Failed to load data', 
  onRetry 
}: { 
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="text-red-500 text-6xl">⚠️</div>
      <p className="text-gray-700 text-center max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

/**
 * Empty state for when no data is available
 */
export function DataEmptyState({ 
  message = 'No data available',
  icon = '📭'
}: { 
  message?: string;
  icon?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="text-6xl">{icon}</div>
      <p className="text-gray-500 text-center max-w-md">{message}</p>
    </div>
  );
}

/**
 * Skeleton loader for cards
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton loader for profile section
 */
export function ProfileSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
      <div className="order-2 lg:order-1">
        <Skeleton className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl" />
      </div>
      <div className="text-center lg:text-left max-w-2xl order-1 lg:order-2 space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-6 w-3/4 mx-auto lg:mx-0" />
        <Skeleton className="h-20 w-full" />
        <div className="flex items-center justify-center lg:justify-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for skills section
 */
export function SkillsSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-24 rounded-full" />
      ))}
    </div>
  );
} 