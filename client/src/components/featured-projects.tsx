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

const getProjectIconStyles = (title: string) => {
  if (title.toLowerCase().includes('api') || title.toLowerCase().includes('backend')) {
    return "p-3 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0";
  }
  if (title.toLowerCase().includes('cloud') || title.toLowerCase().includes('aws')) {
    return "p-3 rounded-lg bg-purple-50 text-purple-600 flex-shrink-0";
  }
  return "p-3 rounded-lg bg-amber-50 text-amber-600 flex-shrink-0";
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProjects.map((project) => {
        const IconComponent = getProjectIcon(project.title);
        const iconStyles = getProjectIconStyles(project.title);
        return (
          <Card 
            key={project.id} 
            className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 h-full"
          >
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className={iconStyles}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-gray-900 text-xl leading-tight mb-2">
                      {project.title}
                    </h4>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                
                <div className="space-y-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-gray-100 text-gray-700 border-gray-200 text-xs px-2 py-1 rounded-md"
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
                        className="text-xs px-4 py-2 h-auto bg-blue-600 hover:bg-blue-700 text-white flex-1"
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
                        className="text-xs px-4 py-2 h-auto border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 flex-1"
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
        <div className="text-center py-8 col-span-full">
          <p className="text-gray-500">No featured projects available.</p>
        </div>
      )}
    </div>
  );
} 