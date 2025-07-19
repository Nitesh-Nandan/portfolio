import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BookOpen, GraduationCap, FileText, ExternalLink, 
  CheckCircle, Clock, Code, Database, Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import type { Book, Course, Article } from "@shared/schema";

export default function LearningSection() {
  const [activeTab, setActiveTab] = useState('reading');
  
  const { data: books, isLoading: booksLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
    queryFn: api.getBooks,
  });

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
    queryFn: api.getCourses,
  });

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
    queryFn: api.getArticles,
  });

  const tabs = [
    { id: 'reading', label: 'Reading', icon: BookOpen },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'articles', label: 'Articles', icon: FileText }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'learning': case 'reading': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const renderBooksContent = () => {
    if (booksLoading) {
      return <div className="text-center py-8">Loading books...</div>;
    }

    if (!books || books.length === 0) {
      return <div className="text-center py-8 text-gray-500">No books found.</div>;
    }

    return (
      <div className="grid gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(book.status)}
                  <h3 className="font-semibold text-lg text-gray-900">{book.title}</h3>
                </div>
                <p className="text-gray-600 mb-3">by {book.author}</p>
                {book.notes && (
                  <p className="text-gray-600 text-sm mb-3">{book.notes}</p>
                )}
                {book.progress !== null && book.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{book.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all" 
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {book.tags && book.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {book.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {book.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <span className="text-sm font-medium text-gray-900">{book.rating}/5</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCoursesContent = () => {
    if (coursesLoading) {
      return <div className="text-center py-8">Loading courses...</div>;
    }

    if (!courses || courses.length === 0) {
      return <div className="text-center py-8 text-gray-500">No courses found.</div>;
    }

    return (
      <div className="grid gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(course.status)}
                  <h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
                </div>
                <p className="text-gray-600 mb-3">by {course.instructor}</p>
                {course.notes && (
                  <p className="text-gray-600 text-sm mb-3">{course.notes}</p>
                )}
                {course.progress !== null && course.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {course.tags && course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {course.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderArticlesContent = () => {
    if (articlesLoading) {
      return <div className="text-center py-8">Loading articles...</div>;
    }

    if (!articles || articles.length === 0) {
      return <div className="text-center py-8 text-gray-500">No articles found.</div>;
    }

    return (
      <div className="grid gap-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(article.status)}
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                </div>
                {article.author && (
                  <p className="text-gray-600 text-sm mb-2">by {article.author}</p>
                )}
                {article.summary && (
                  <p className="text-gray-600 text-sm mb-3">{article.summary}</p>
                )}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {article.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {article.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if ((booksLoading && activeTab === 'reading') || 
      (coursesLoading && activeTab === 'courses') || 
      (articlesLoading && activeTab === 'articles')) {
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

  return (
    <section id="learning" className="section-padding bg-gray-50/30">
      <div className="container-width">
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Learning & Development</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Books, courses, and articles that keep me updated with the latest technologies.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blue-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'reading' && renderBooksContent()}
          {activeTab === 'courses' && renderCoursesContent()}
          {activeTab === 'articles' && renderArticlesContent()}
        </div>
      </div>
    </section>
  );
} 