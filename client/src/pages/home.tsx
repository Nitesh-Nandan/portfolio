import Navigation from "@/components/navigation";
import FeaturedProjects from "@/components/featured-projects";
import RecentReads from "@/components/recent-reads";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Server, Database, Brain, Cloud, Settings, Linkedin, Github, Twitter, Mail } from "lucide-react";
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
      <section className="pt-32 pb-20">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
            <div className="order-2 lg:order-1">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
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
            <div className="text-center lg:text-left max-w-2xl order-1 lg:order-2">
              {personalInfoLoading ? (
                <div className="space-y-4">
                  <div className="h-16 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 bg-gray-200 animate-pulse rounded" />
                  <div className="h-20 bg-gray-200 animate-pulse rounded" />
                </div>
              ) : (
                <>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                    Hi, I'm {personalInfo?.firstName} {personalInfo?.lastName}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {personalInfo?.title}
                  </p>
                  <p 
                    className="text-lg text-gray-600 leading-7 font-normal tracking-wide mb-8 hyphens-none break-words max-w-full"
                    dangerouslySetInnerHTML={{ __html: personalInfo?.bio || '' }}
                  />
                </>
              )}
              
              {/* Social Media Links */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
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
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/projects">
                  <Button 
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 w-full sm:w-auto"
                  >
                    View My Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 w-full sm:w-auto"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized in building scalable backend systems and AI-powered applications
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {skillsLoading ? (
              <div className="text-center text-gray-500">Loading skills...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Backend Development Card */}
                <div className="bg-blue-50/50 p-12 rounded-2xl border border-blue-100/50 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Backend</h3>
                  </div>
                  <hr className="border-gray-200 mb-6" />
                  <div className="flex flex-wrap gap-2">
                    {skillGroups.backend?.length > 0 ? (
                      skillGroups.backend.map((skill: Skill) => (
                        <span key={skill.id} className="px-3 py-1 bg-blue-100 text-gray-900 text-sm font-normal rounded-full">
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No backend skills available</span>
                    )}
                  </div>
                </div>

                {/* Database & Cloud Card */}
                <div className="bg-green-50/50 p-12 rounded-2xl border border-green-100/50 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Server className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Database & Cloud</h3>
                  </div>
                  <hr className="border-gray-200 mb-6" />
                  <div className="flex flex-wrap gap-2">
                    {skillGroups.database?.length > 0 ? (
                      skillGroups.database.map((skill: Skill) => (
                        <span key={skill.id} className="px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No database & cloud skills available</span>
                    )}
                  </div>
                </div>

                {/* Generative AI Card */}
                <div className="bg-purple-50/50 p-12 rounded-2xl border border-purple-100/50 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Generative AI</h3>
                  </div>
                  <hr className="border-gray-200 mb-6" />
                  <div className="flex flex-wrap gap-2">
                    {skillGroups.ai?.length > 0 ? (
                      skillGroups.ai.map((skill: Skill) => (
                        <span key={skill.id} className="px-3 py-1 bg-purple-100 text-gray-900 text-sm font-normal rounded-full">
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No AI skills available</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Projects showcasing my expertise in backend engineering, microservices architecture, and AI integration.
            </p>
          </div>
          <FeaturedProjects />
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
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
              Books I'm actively reading to stay updated with the latest technologies and best practices.
            </p>
          </div>
          <RecentReads />
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                View All Readings
                <ArrowRight className="ml-2 h-5 w-5" />
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
