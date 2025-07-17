import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CARD_STYLES } from "@/lib/ui-constants";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export function SectionCard({ children, className }: SectionCardProps) {
  return (
    <Card className={className || CARD_STYLES.base}>
      <CardContent className={CARD_STYLES.content}>
        <div className="flex flex-col h-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

interface CardHeaderProps {
  icon: ReactNode;
  title: string;
  className?: string;
}

export function CardHeader({ icon, title, className }: CardHeaderProps) {
  return (
    <div className={className || "flex items-start gap-4 mb-4"}>
      {icon}
      <div className="flex-grow min-w-0">
        <h4 className="font-semibold text-gray-900 text-xl leading-tight mb-2">
          {title}
        </h4>
      </div>
    </div>
  );
}

interface CardContentAreaProps {
  children: ReactNode;
  className?: string;
}

export function CardContentArea({ children, className }: CardContentAreaProps) {
  return (
    <div className={className || "flex-grow"}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={className || "space-y-4 mt-auto"}>
      {children}
    </div>
  );
} 