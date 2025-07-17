import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Code2, Zap, Database, Cloud } from "lucide-react";
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

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (isLoading) {
    return (
      <section id="projects" className="section-padding bg-soft">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Code2 className="h-8 w-8 text-primary" />
              <h2>My Projects</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Loading my latest work...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-soft">
      <div className="container-width">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code2 className="h-8 w-8 text-primary" />
            <h2>My Projects</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work in backend engineering, featuring scalable systems, AI integration, and performance optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project, index) => {
            const IconComponent = getProjectIcon(project.title);
            return (
              <Card 
                key={project.id} 
                className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:scale-105 animate-fade-in h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-muted/50 text-foreground border border-border/50 px-3 py-1 rounded-full font-medium hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
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
                          className="gradient-subtle text-white hover:shadow-lg transition-all duration-300 flex-1"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 flex-1"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {(!projects || projects.length === 0) && (
          <div className="text-center py-12">
            <Code2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No projects available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
