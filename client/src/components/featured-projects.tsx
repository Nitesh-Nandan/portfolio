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

  return (
    <SectionCard key={project.id}>
      <CardHeader
        icon={
          <div className={iconStyles}>
            <IconComponent className="h-6 w-6" />
          </div>
        }
        title={project.title}
      />
      
      <CardContentArea>
        <p className={TYPOGRAPHY_STYLES.cardSubtitle}>
          {project.description}
        </p>
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
  const { projects, isLoading, isEmpty } = useFeaturedProjects(3);

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