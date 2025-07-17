import { LOADING_STYLES } from "@/lib/ui-constants";

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={className || LOADING_STYLES.container}>
      <div className={LOADING_STYLES.center}>
        <div className={LOADING_STYLES.spinner} />
      </div>
    </div>
  );
} 