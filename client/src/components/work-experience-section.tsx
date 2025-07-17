import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, Trophy } from "lucide-react";
import type { WorkExperience } from "@shared/schema";

interface WorkExperienceTimelineProps {
  experiences: WorkExperience[];
}

function WorkExperienceTimeline({ experiences }: WorkExperienceTimelineProps) {
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Sort by start date descending (most recent first)
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0) {
      return remainingMonths > 0 ? `${years} yr ${remainingMonths} mo` : `${years} yr`;
    }
    return `${months} mo`;
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      
      <div className="space-y-8">
        {sortedExperiences.map((experience, index) => (
          <div key={experience.id} className="relative flex items-start">
            {/* Timeline dot */}
            <div className={`absolute left-4 w-4 h-4 rounded-full border-4 ${
              experience.isCurrent 
                ? 'bg-primary border-primary' 
                : 'bg-white border-gray-300'
            }`}></div>
            
            {/* Content */}
            <div className="ml-12 flex-1">
              <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-secondary mb-1">
                        {experience.position}
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary mb-2">
                        {experience.company}
                      </CardDescription>
                    </div>
                    {experience.isCurrent && (
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 w-fit">
                        Current
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                      <span className="ml-2 text-xs">
                        ({calculateDuration(experience.startDate, experience.endDate)})
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-secondary leading-relaxed">
                    {experience.description}
                  </p>
                  
                  {experience.achievements && experience.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-primary" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-1 text-sm text-muted">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="bg-neutral text-secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkExperienceSection() {
  const { data: experiences, isLoading, error } = useQuery<WorkExperience[]>({
    queryKey: ['/api/work-experience'],
  });

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-neutral">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Work Experience</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              My professional journey in backend engineering and GenAI development
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20 bg-neutral">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Work Experience</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              My professional journey in backend engineering and GenAI development
            </p>
          </div>
          <div className="text-center text-muted">
            <p>Unable to load work experience data</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-neutral">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Work Experience</h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            My professional journey in backend engineering and GenAI development
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <WorkExperienceTimeline experiences={experiences || []} />
        </div>
      </div>
    </section>
  );
}