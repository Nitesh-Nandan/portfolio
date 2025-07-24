import type { Project } from "@shared/schema";
import { useFeaturedProjects } from "@/hooks/use-data-queries";
import { getProjectIcon, getProjectIconStyles } from "@/lib/ui-utils";
import { GRID_STYLES, TYPOGRAPHY_STYLES } from "@/lib/ui-constants";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SectionCard, CardHeader, CardContentArea, CardFooter } from "@/components/ui/section-card";
import { TechnologyBadges } from "@/components/ui/technology-badges";
import { ProjectActions } from "@/components/ui/project-actions";
import { EmptyState } from "@/components/ui/empty-state";

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
      
      <CardFooter>
        <TechnologyBadges technologies={project.technologies} />
        <ProjectActions 
          liveUrl={project.liveUrl ?? undefined}
          githubUrl={project.githubUrl ?? undefined}
        />
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