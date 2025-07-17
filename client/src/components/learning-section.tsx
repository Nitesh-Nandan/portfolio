import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BookOpen, GraduationCap, FileText, ExternalLink, 
  CheckCircle, Clock, Code, Database, Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@shared/schema";

// Simple mock data
const mockCourses = [
  {
    id: 1,
    title: "System Design Interview",
    instructor: "Alex Xu",
    url: "https://www.educative.io/courses/grokking-the-system-design-interview",
    status: "completed",
    icon: Database
  },
  {
    id: 2,
    title: "Microservices with Spring Boot",
    instructor: "John Thompson", 
    url: "https://www.udemy.com/course/spring-boot-microservices/",
    status: "learning",
    icon: Code
  },
  {
    id: 3,
    title: "Building LLM Applications",
    instructor: "OpenAI",
    url: "https://platform.openai.com/docs",
    status: "completed",
    icon: Brain
  }
];

const mockArticles = [
  {
    id: 1,
    title: "Building Resilient Microservices",
    url: "https://martinfowler.com/articles/microservices.html"
  },
  {
    id: 2,
    title: "Scaling Java Applications on Kubernetes",
    url: "https://spring.io/blog/2022/03/17/scaling-java-applications"
  },
  {
    id: 3,
    title: "The Future of Backend Development",
    url: "https://github.blog/2023-11-08-the-future-of-backend-development/"
  },
  {
    id: 4,
    title: "GenAI in Production Systems",
    url: "https://openai.com/blog/chatgpt-enterprise"
  }
];

export default function LearningSection() {
  const [activeTab, setActiveTab] = useState('reading');
  
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  const tabs = [
    { id: 'reading', label: 'Reading', icon: BookOpen },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'articles', label: 'Articles', icon: FileText }
  ];

  if (isLoading && activeTab === 'reading') {
    return (
      <section id="learning" className="section-padding bg-gray-50/30">
        <div className="container-width">
          <div className="text-center mb-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Learning & Development</h1>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  const renderReadingContent = () => {
    const allBooks = books || [];

    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {allBooks.map((book, index) => (
            <div key={book.id} className="group">
              <div className="p-4 md:p-6 border-b border-gray-100 hover:bg-gray-50/50 rounded-lg transition-all duration-300">
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors leading-tight">
                  {book.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">by {book.author}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className={`flex items-center gap-1.5 text-sm ${
                    book.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {book.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 flex-shrink-0" />
                    )}
                    <span className="whitespace-nowrap">
                      {book.status === 'completed' ? 'Completed' : 'Reading'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCoursesContent = () => {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {mockCourses.map((course) => {
            const CourseIcon = course.icon;
            return (
              <div key={course.id} className="group">
                <div className="p-4 md:p-6 border-b border-gray-100 hover:bg-gray-50/50 rounded-lg transition-all duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/15 text-primary mt-1 flex-shrink-0">
                      <CourseIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-4">by {course.instructor}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className={`flex items-center gap-1.5 text-sm ${
                      course.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {course.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <Clock className="h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="whitespace-nowrap">
                        {course.status === 'completed' ? 'Completed' : 'Learning'}
                      </span>
                    </div>
                    
                    <a 
                      href={course.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span className="whitespace-nowrap">View Course</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderArticlesContent = () => {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {mockArticles.map((article) => (
            <div key={article.id} className="group">
              <div className="p-4 md:p-6 border-b border-gray-100 hover:bg-gray-50/50 rounded-lg transition-all duration-300">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors flex-grow leading-tight">
                      {article.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="learning" className="section-padding bg-gray-50/30">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
            Learning & Development
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Books, courses, and articles that keep me updated with the latest technologies.
          </p>
        </div>

        {/* Responsive Tab Navigation */}
        <div className="flex justify-center mb-12 md:mb-16 px-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-4 md:space-x-8 space-y-2 sm:space-y-0 bg-white/80 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none shadow-sm sm:shadow-none">
            {tabs.map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2 rounded-lg sm:rounded-none transition-all duration-300 text-sm md:text-base ${
                    activeTab === tab.id 
                      ? 'text-primary bg-primary/10 sm:bg-transparent border-l-4 sm:border-l-0 sm:border-b-2 border-primary font-medium' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 sm:hover:bg-transparent'
                  }`}
                >
                  <TabIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in px-4 sm:px-0">
          {activeTab === 'reading' && renderReadingContent()}
          {activeTab === 'courses' && renderCoursesContent()}
          {activeTab === 'articles' && renderArticlesContent()}
        </div>
      </div>
    </section>
  );
} 