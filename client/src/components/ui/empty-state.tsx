import { ReactNode } from "react";
import { EMPTY_STATE_STYLES, TYPOGRAPHY_STYLES } from "@/lib/ui-constants";

interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
  className?: string;
}

export function EmptyState({ icon, message, className }: EmptyStateProps) {
  return (
    <div className={className || EMPTY_STATE_STYLES.container}>
      {icon && (
        <div className={EMPTY_STATE_STYLES.icon}>
          {icon}
        </div>
      )}
      <p className={TYPOGRAPHY_STYLES.emptyState}>{message}</p>
    </div>
  );
} 