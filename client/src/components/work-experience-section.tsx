import { useQuery } from "@tanstack/react-query";
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
      {/* Animated Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-pink-500 to-green-500 shadow-sm">
        {/* Animated progress overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-400 via-emerald-400 to-blue-400 animate-pulse opacity-60"></div>
        {/* Moving highlight */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-bounce" style={{ animationDuration: '2s' }}></div>
      </div>
      
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
              <div className="group bg-gradient-to-br from-white via-gray-50/30 to-white backdrop-blur-sm border border-gray-200/60 hover:border-gray-300/80 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 hover:scale-[1.01] rounded-3xl p-8 overflow-hidden relative">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/20 pointer-events-none rounded-3xl"></div>
                
                <div className="relative z-10">
                  {/* Header Section */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight">
                        {experience.position}
                      </h3>
                      <p className="text-lg font-medium text-gray-900 mb-3">
                        {experience.company}
                      </p>
                    </div>
                    {experience.isCurrent && (
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 px-4 py-1.5 rounded-full font-medium shadow-lg shadow-green-600/30 text-sm">
                        Current Position
                      </Badge>
                    )}
                  </div>
                  
                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-1.5 rounded-full">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                        {calculateDuration(experience.startDate, experience.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50/50 px-3 py-1.5 rounded-full">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{experience.location}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-foreground leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                  
                  {/* Achievements */}
                  {experience.achievements && experience.achievements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Technologies */}
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="secondary" 
                            className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200/60 px-3 py-1.5 rounded-full font-medium hover:from-gray-100 hover:to-gray-200 hover:border-gray-300/80 transition-all duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
    <div>
      <WorkExperienceTimeline experiences={experiences || []} />
    </div>
  );
}