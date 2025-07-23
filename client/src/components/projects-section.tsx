import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Code2, Database, Cloud, Zap, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";
import { api } from "@/lib/api";

const getProjectIconAndColors = (title: string) => {
  if (title.toLowerCase().includes('api') || title.toLowerCase().includes('backend') || title.toLowerCase().includes('microservice')) {
    return {
      icon: Database,
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      text: 'text-emerald-600'
    };
  }
  if (title.toLowerCase().includes('cloud') || title.toLowerCase().includes('aws')) {
    return {
      icon: Cloud,
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      text: 'text-purple-600'
    };
  }
  if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('messaging')) {
    return {
      icon: Zap,
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      text: 'text-amber-600'
    };
  }
  return {
    icon: Code2,
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    text: 'text-blue-600'
  };
};

interface ProjectsSectionProps {
  showAllProjects?: boolean;
}

export default function ProjectsSection({ showAllProjects = false }: ProjectsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  
  const { data: allProjects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    queryFn: api.getProjects,
  });

  // Get all unique technologies for filter
  const allTechnologies = useMemo(() => {
    if (!allProjects) return [];
    const techSet = new Set<string>();
    allProjects.forEach(project => {
      project.technologies?.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [allProjects]);

  // Filter projects based on search term and technology
  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    
    let filtered = showAllProjects ? allProjects : allProjects.filter(project => project.featured);
    
    // Filter by search term (project name)
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by technology
    if (selectedTechnology) {
      filtered = filtered.filter(project => 
        project.technologies?.some(tech => 
          tech.toLowerCase() === selectedTechnology.toLowerCase()
        )
      );
    }
    
    return filtered;
  }, [allProjects, showAllProjects, searchTerm, selectedTechnology]);

  if (isLoading) {
    return (
      <section id="projects" className="section-padding bg-gray-50/30">
        <div className="container-width">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              {showAllProjects ? "Projects" : "Featured Projects"}
            </h2>
            <p className="text-gray-600 text-lg">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={showAllProjects ? "bg-gray-50/30" : "section-padding bg-gray-50/30"}>
      <div className="container-width">
        {!showAllProjects && (
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A showcase of my recent work in backend engineering and AI integration.
            </p>
          </div>
        )}

        {/* Filter Section */}
        {showAllProjects && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Search by project name */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter by technology */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Technologies</option>
                  {allTechnologies.map((tech: string) => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
              
              {/* Clear filters */}
              {(searchTerm || selectedTechnology) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTechnology('');
                  }}
                  className="px-4 py-2"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {filteredProjects?.map((project: Project) => {
              const { icon: IconComponent, bg, text } = getProjectIconAndColors(project.title);
              return (
                <div key={project.id} className="group p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-2.5 rounded-xl ${bg} ${text} flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="text-gray-600 mb-5 leading-relaxed text-base space-y-2">
                    {Array.isArray(project.description) ? (
                      project.description.map((desc, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: desc }} />
                      ))
                    ) : (
                      <p dangerouslySetInnerHTML={{ __html: project.description }} />
                    )}
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2.5">
                      {project.technologies.slice(0, 5).map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full font-medium border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-xs px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-full font-medium border border-gray-300 shadow-sm">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 pt-1 border-t border-gray-100">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 transition-all duration-200 flex items-center gap-2 font-medium hover:gap-3 group/link"
                        >
                          <ExternalLink className="h-4 w-4 group-hover/link:scale-110 transition-transform duration-200" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-gray-900 hover:text-black transition-all duration-200 flex items-center gap-2 font-bold hover:gap-3 group/link"
                        >
                          <Github className="h-4 w-4 group-hover/link:scale-110 transition-transform duration-200" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {(!filteredProjects || filteredProjects.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm || selectedTechnology 
                ? "No projects match your filters." 
                : "No projects available yet."
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
