import { ExternalLink, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BUTTON_STYLES } from "@/lib/ui-constants";
import { cn } from "@/lib/ui-utils";
import { formatDate } from "@/lib/utils";

interface ProjectActionsProps {
  liveUrl?: string;
  githubUrl?: string;
  lastCommitDate?: string;
}

// Helper function to get layout classes based on number of elements
function getLayoutClasses(totalElements: number): string {
  if (totalElements === 3) {
    return 'grid grid-cols-3 gap-4';
  }
  if (totalElements === 2) {
    return 'flex items-center justify-between';
  }
  return 'flex items-center justify-start';
}

// Helper function to get last commit date with fallbacks
function getLastCommitDate(project: any): string | undefined {
  return (project as any).last_committed_date || 
         (project as any).last_commit_date || 
         (project as any).lastCommitDate;
}

// Component for Demo button
function DemoButton({ liveUrl }: { liveUrl: string }) {
  return (
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
  );
}

// Component for Code button
function CodeButton({ githubUrl }: { githubUrl: string }) {
  return (
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
  );
}

// Component for Last Commit Date with tooltip
function LastCommitDate({ date, totalElements }: { date: string; totalElements: number }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`flex items-center gap-1.5 text-sm text-gray-900 hover:text-black transition-all duration-200 font-bold ${
          totalElements === 3 ? 'justify-self-end' : ''
        }`}>
          <Calendar className="h-4 w-4" />
          <span>{formatDate(date)}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Last commit: {formatDate(date)}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function ProjectActions({ liveUrl, githubUrl, lastCommitDate }: ProjectActionsProps) {
  // If lastCommitDate is provided, use the dynamic layout
  if (lastCommitDate) {
    const hasLiveUrl = !!liveUrl;
    const hasGithubUrl = !!githubUrl;
    const hasLastCommit = !!lastCommitDate;
    const totalElements = [hasLiveUrl, hasGithubUrl, hasLastCommit].filter(Boolean).length;
    
    return (
      <div className={`pt-2 px-4 ${getLayoutClasses(totalElements)}`}>
        {liveUrl && <DemoButton liveUrl={liveUrl} />}
        {githubUrl && <CodeButton githubUrl={githubUrl} />}
        <LastCommitDate date={lastCommitDate} totalElements={totalElements} />
      </div>
    );
  }
  
  // Simple layout for FeaturedProjects (no lastCommitDate)
  return (
    <div className="flex items-center justify-start pt-2">
      <div className="flex gap-3">
        {liveUrl && <DemoButton liveUrl={liveUrl} />}
        {githubUrl && <CodeButton githubUrl={githubUrl} />}
      </div>
    </div>
  );
}

// Export helper function for use in other components
export { getLastCommitDate }; 