import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (isLoading) {
    return (
      <section id="projects" className="min-h-screen bg-neutral py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">My Projects</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen bg-neutral py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">My Projects</h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            A showcase of my recent work in web development and design, featuring diverse projects from e-commerce to SaaS applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <Card key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2">{project.title}</h3>
                <p className="text-muted mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-primary hover:text-blue-700"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-muted hover:text-secondary"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
