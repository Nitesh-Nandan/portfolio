import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUTTON_STYLES } from "@/lib/ui-constants";
import { cn } from "@/lib/ui-utils";

interface ProjectActionsProps {
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectActions({ liveUrl, githubUrl }: ProjectActionsProps) {
  return (
    <div className="flex gap-3 pt-2">
      {liveUrl && (
        <Button
          variant="default"
          size="sm"
          className={cn(BUTTON_STYLES.base, BUTTON_STYLES.demo)}
          asChild
        >
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3 mr-2" />
            Demo
          </a>
        </Button>
      )}
      {githubUrl && (
        <Button
          variant="outline"
          size="sm"
          className={cn(BUTTON_STYLES.base, BUTTON_STYLES.code)}
          asChild
        >
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-3 w-3 mr-2" />
            Code
          </a>
        </Button>
      )}
    </div>
  );
} 