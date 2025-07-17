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
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
      
      <div className="space-y-12">
        {sortedExperiences.map((experience, index) => (
          <div key={experience.id} className="relative flex items-start">
            {/* Timeline dot */}
            <div className={`absolute left-4 w-4 h-4 rounded-full border-4 transition-all duration-300 ${
              experience.isCurrent 
                ? 'gradient-subtle border-white shadow-lg scale-125' 
                : 'bg-white border-primary/40 hover:border-primary'
            }`}></div>
            
            {/* Content */}
            <div className="ml-12 flex-1 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <Card className="group bg-white/95 backdrop-blur-sm border border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground mb-2 leading-tight">
                        {experience.position}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-primary mb-3">
                        {experience.company}
                      </CardDescription>
                    </div>
                    {experience.isCurrent && (
                      <Badge className="gradient-subtle text-white border-0 px-4 py-1 rounded-full font-medium shadow-lg">
                        Current Position
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {calculateDuration(experience.startDate, experience.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{experience.location}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-foreground leading-relaxed text-lg">
                    {experience.description}
                  </p>
                  
                  {experience.achievements && experience.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full gradient-subtle mt-2 flex-shrink-0"></div>
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
                            className="bg-muted/50 text-foreground border border-border/50 px-3 py-1 rounded-full font-medium hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
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
  });

  if (isLoading) {
    return (
      <section id="experience" className="section-padding bg-soft-alt">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Briefcase className="h-8 w-8 text-primary" />
              <h2>Work Experience</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Loading my professional journey...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="section-padding bg-soft-alt">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Briefcase className="h-8 w-8 text-primary" />
              <h2>Work Experience</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              My professional journey in backend engineering and GenAI development
            </p>
          </div>
          <div className="text-center text-muted-foreground">
            <p>Unable to load work experience data</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section-padding bg-soft-alt">
      <div className="container-width">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2>Work Experience</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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