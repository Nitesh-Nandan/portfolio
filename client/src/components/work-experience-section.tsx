import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, Trophy } from "lucide-react";
import type { WorkExperience } from "@shared/schema";
import { api } from "@/lib/api";

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
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-yellow-400 via-emerald-400 to-gray-300 shadow-sm"></div>
      
      <div className="space-y-8">
        {sortedExperiences.map((experience, index) => (
          <div key={experience.id} className="relative flex items-start">
            {/* Timeline dot */}
            <div className={`absolute left-4 w-4 h-4 rounded-full border-4 transition-all duration-300 ${
              experience.isCurrent 
                ? 'bg-green-600 border-white shadow-lg shadow-green-600/30 scale-125' 
                : 'bg-white border-emerald-300 hover:border-emerald-400 shadow-sm'
            }`}></div>
            
            {/* Content */}
            <div className="ml-12 flex-1 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <Card className="group bg-white/95 backdrop-blur-sm border border-border/50 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground mb-2 leading-tight">
                        {experience.position}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-900 mb-3">
                        {experience.company}
                      </CardDescription>
                    </div>
                    {experience.isCurrent && (
                      <Badge className="bg-green-600 text-white border-0 px-4 py-1.5 rounded-full font-medium shadow-lg shadow-green-600/30 text-sm">
                        Current Position
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                        {calculateDuration(experience.startDate, experience.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{experience.location}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    {experience.description}
                  </p>
                  
                  {experience.achievements && experience.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-gray-600 mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="secondary" 
                            className="bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1 rounded-md font-medium hover:bg-gray-200 transition-colors"
                          >
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
    queryFn: api.getWorkExperience,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-muted-foreground py-12">
          <p>Unable to load work experience data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <WorkExperienceTimeline experiences={experiences || []} />
    </div>
  );
}