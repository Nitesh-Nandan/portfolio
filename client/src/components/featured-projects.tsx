import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Zap, Database, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

const getProjectIcon = (title: string) => {
  if (title.toLowerCase().includes('api') || title.toLowerCase().includes('backend')) {
    return Database;
  }
  if (title.toLowerCase().includes('cloud') || title.toLowerCase().includes('aws')) {
    return Cloud;
  }
  return Zap;
};

export default function FeaturedProjects() {
  const { data: allProjects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Filter to show only featured projects and limit to 3
  const featuredProjects = allProjects?.filter(project => project.featured).slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {featuredProjects.map((project, index) => {
        const IconComponent = getProjectIcon(project.title);
        return (
          <Card 
            key={project.id} 
            className="group bg-white/95 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 hover:scale-105 hover:bg-white hover:-translate-y-1 animate-fade-in cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col h-full min-h-[240px]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-foreground text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                
                <div className="space-y-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-primary/10 text-primary border border-primary/20 text-xs px-2 py-1 rounded-md font-medium hover:bg-primary/20 transition-colors group-hover:bg-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    {project.liveUrl && (
                      <Button
                        variant="default"
                        size="sm"
                        className="text-xs px-4 py-2 h-auto bg-primary hover:bg-primary/90 text-white flex-1 group-hover:shadow-lg transition-all"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-4 py-2 h-auto border-border hover:bg-muted/50 flex-1 group-hover:border-primary/40 transition-all"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {featuredProjects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No featured projects available.</p>
        </div>
      )}
    </div>
  );
} 