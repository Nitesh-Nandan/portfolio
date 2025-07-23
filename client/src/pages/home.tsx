import Navigation from "@/components/navigation";
import FeaturedProjects from "@/components/featured-projects";
import RecentReads from "@/components/recent-reads";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Server, Database, Brain, Cloud, Settings, Linkedin, Github, Twitter, Mail, Briefcase, MessageCircle, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useSkills, usePersonalInfo, useFooterContent } from "@/hooks/use-data-queries";
import type { Skill } from "@shared/schema";

export default function HomePage() {
  const { data: skills, loading: skillsLoading } = useSkills();
  const { data: personalInfo, loading: personalInfoLoading } = usePersonalInfo();
  const { data: footerContent } = useFooterContent();

  // Group skills by category for display
  const getSkillsByVisualCategory = (): { backend: Skill[]; database: Skill[]; ai: Skill[] } => {
    if (!skills || skills.length === 0) return { backend: [], database: [], ai: [] };
    
    const skillGroups = {
      backend: skills.filter(skill => 
        skill.category.toLowerCase() === 'backend' || 
        skill.category.toLowerCase() === 'frontend'
      ),
      database: skills.filter(skill => 
        skill.category.toLowerCase() === 'database' || 
        skill.category.toLowerCase() === 'devops'
      ),
      ai: skills.filter(skill => 
        skill.category.toLowerCase() === 'tools' ||
        skill.name.toLowerCase().includes('ai') ||
        skill.name.toLowerCase().includes('langchain') ||
        skill.name.toLowerCase().includes('machine')
      )
    };

    return skillGroups;
  };

  const skillGroups = getSkillsByVisualCategory();

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-blue-50/30 to-white">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
            <div className="order-2 lg:order-1 animate-slide-in-left">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                {personalInfoLoading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : (
                  <img 
                    src={personalInfo?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"} 
                    alt={`${personalInfo?.firstName} ${personalInfo?.lastName} - Professional`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="text-center lg:text-left max-w-2xl order-1 lg:order-2 animate-slide-in-right">
              {personalInfoLoading ? (
                <div className="space-y-4">
                  <div className="h-16 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 bg-gray-200 animate-pulse rounded" />
                  <div className="h-20 bg-gray-200 animate-pulse rounded" />
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                      Hi, I'm{' '}
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-black tracking-tight">
                        {personalInfo?.firstName} {personalInfo?.lastName}
                      </span>
                    </h1>
                  </div>
                  <div className="mb-8">
                    <p className="text-xl text-gray-700 font-medium mb-6 border-l-4 border-blue-500 pl-4">
                      {personalInfo?.title}
                    </p>
                    <p 
                      className="text-lg text-gray-600 leading-7 font-normal tracking-wide hyphens-none break-words max-w-full"
                      dangerouslySetInnerHTML={{ __html: personalInfo?.bio || '' }}
                    />
                  </div>
                </>
              )}
              
              {/* Social Media Links */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
                {footerContent?.socialLinks?.linkedin && (
                  <a
                    href={footerContent.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 group"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                )}
                {footerContent?.socialLinks?.github && (
                  <a
                    href={footerContent.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
                    title="GitHub"
                  >
                    <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                )}
                {footerContent?.socialLinks?.twitter && (
                  <a
                    href={footerContent.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 transition-all duration-200 group"
                    title="Twitter"
                  >
                    <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                )}
                <a
                  href={`mailto:${personalInfo?.email || 'niteshnitp5686@gmail.com'}`}
                  className="p-3 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 group"
                  title="Email"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
                <Link href="/projects">
                  <Button 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    View My Work
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Toolkit</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some of the key technologies I work with.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {skillsLoading ? (
              <div className="text-center text-gray-500">Loading skills...</div>
            ) : (
              <div className="flex flex-wrap justify-center gap-3">
                {skills?.map((skill: Skill) => (
                  <span 
                    key={skill.id} 
                    className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors duration-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Briefcase className="h-6 w-6 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900">Recent Projects</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Projects showcasing my expertise in backend engineering, microservices architecture, and AI integration.
            </p>
          </div>
          <FeaturedProjects />
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Learning</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Books, courses, and articles I'm actively engaging with to stay updated with the latest technologies and best practices.
            </p>
          </div>
          <RecentReads />
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                View All Learning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
