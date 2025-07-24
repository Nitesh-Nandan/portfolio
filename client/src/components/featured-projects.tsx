import type { Project } from "@shared/schema";
import { useFeaturedProjects } from "@/hooks/use-data-queries";
import { getProjectIcon, getProjectIconStyles } from "@/lib/ui-utils";
import { GRID_STYLES, TYPOGRAPHY_STYLES } from "@/lib/ui-constants";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SectionCard, CardHeader, CardContentArea, CardFooter } from "@/components/ui/section-card";
import { TechnologyBadges } from "@/components/ui/technology-badges";
import { ProjectActions } from "@/components/ui/project-actions";
import { EmptyState } from "@/components/ui/empty-state";
import { ExternalLink, Github } from "lucide-react";

// Helper components for FeaturedProjects buttons
function DemoButton({ liveUrl }: { liveUrl: string }) {
  return (
    <a 
      href={liveUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
    >
      <ExternalLink className="h-3 w-3" />
      Demo
    </a>
  );
}

function CodeButton({ githubUrl }: { githubUrl: string }) {
  return (
    <a 
      href={githubUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors duration-200"
    >
      <Github className="h-3 w-3" />
      Code
    </a>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const IconComponent = getProjectIcon(project.title);
  const iconStyles = getProjectIconStyles(project.title);

  // Handle both string and array descriptions for backward compatibility
  const descriptionArray = Array.isArray(project.description) 
    ? project.description 
    : [project.description];

  return (
    <SectionCard key={project.id} className="group hover:shadow-lg transition-all duration-300">
      <CardHeader
        icon={
          <div className={iconStyles}>
            <IconComponent className="h-6 w-6" />
          </div>
        }
        title={project.title}
      />
      
      <CardContentArea>
        <div className="space-y-1 pb-6">
          {descriptionArray.map((item, index) => (
            <div key={index}>
              <span 
                className={TYPOGRAPHY_STYLES.cardSubtitle}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </div>
          ))}
        </div>
      </CardContentArea>
      
      <CardFooter className="space-y-4 mt-auto">
        <TechnologyBadges technologies={project.technologies} />
        <div className="flex items-center justify-start pt-2">
          <div className="flex gap-3">
            {project.liveUrl && <DemoButton liveUrl={project.liveUrl} />}
            {project.githubUrl && <CodeButton githubUrl={project.githubUrl} />}
          </div>
        </div>
      </CardFooter>
    </SectionCard>
  );
}

export default function FeaturedProjects() {
  const { data: projects, loading: isLoading, error } = useFeaturedProjects();
  const isEmpty = !isLoading && (!projects || projects.length === 0);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={GRID_STYLES.responsive}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {isEmpty && (
        <EmptyState message="No featured projects available." />
      )}
    </div>
  );
} 