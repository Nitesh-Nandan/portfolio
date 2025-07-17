import { Badge } from "@/components/ui/badge";
import { BADGE_STYLES } from "@/lib/ui-constants";
import { cn } from "@/lib/ui-utils";

interface TechnologyBadgesProps {
  technologies: string[];
  variant?: 'technology' | 'reading';
  className?: string;
}

export function TechnologyBadges({ 
  technologies, 
  variant = 'technology',
  className 
}: TechnologyBadgesProps) {
  const badgeStyles = variant === 'technology' 
    ? BADGE_STYLES.technology 
    : BADGE_STYLES.reading;

  return (
    <div className={className || "flex flex-wrap gap-2"}>
      {technologies.map((tech, index) => (
        <Badge 
          key={index} 
          variant="secondary" 
          className={cn(BADGE_STYLES.base, badgeStyles)}
        >
          {tech}
        </Badge>
      ))}
    </div>
  );
}

interface SingleBadgeProps {
  text: string;
  variant?: 'technology' | 'reading';
  className?: string;
}

export function SingleBadge({ text, variant = 'reading', className }: SingleBadgeProps) {
  const badgeStyles = variant === 'technology' 
    ? BADGE_STYLES.technology 
    : BADGE_STYLES.reading;

  return (
    <div className={className || "flex flex-wrap gap-2"}>
      <Badge 
        variant="secondary" 
        className={cn(BADGE_STYLES.base, badgeStyles)}
      >
        {text}
      </Badge>
    </div>
  );
} 