import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BookOpen, GraduationCap, FileText, ExternalLink, 
  CheckCircle, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import type { Book, Course, Article } from "@shared/schema";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";

interface LearningCardProps {
  item: Book | Course | Article;
  type: 'books' | 'courses' | 'articles';
}

function LearningCard({ item, type }: LearningCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'books': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'courses': return <GraduationCap className="w-5 h-5 text-purple-500" />;
      case 'articles': return <FileText className="w-5 h-5 text-green-500" />;
      default: return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'learning': case 'reading': case 'currently-reading': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'learning': case 'reading': case 'currently-reading': return <Badge className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      default: return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Planned</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow min-h-[200px] w-full">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {getTypeIcon()}
          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2">
            {item.title}
          </h3>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-1">
        {type === 'books' && 'author' in item && `by ${item.author}`}
        {type === 'courses' && 'instructor' in item && `by ${item.instructor}`}
        {type === 'articles' && 'author' in item && `by ${item.author}`}
      </p>
      
      {/* Notes section if available */}
      {('notes' in item && item.notes) && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.notes}
        </p>
      )}
      
      {/* Tags section if available */}
      {('tags' in item && item.tags && item.tags.length > 0) && (
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.slice(0, 3).map((tag: string, index: number) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{item.tags.length - 3} more
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          {getStatusIcon(item.status)}
          {getStatusBadge(item.status)}
        </div>
        {'url' in item && item.url && (
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Open link"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function LearningSection() {
  const [activeTab, setActiveTab] = useState('courses');
  
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
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'books', label: 'Books', icon: BookOpen }
  ];

  const getTabData = () => {
    switch (activeTab) {
      case 'books':
        return books || [];
      case 'courses':
        return courses || [];
      case 'articles':
        return articles || [];
      default:
        return [];
    }
  };

  const isLoading = (activeTab === 'books' && booksLoading) || 
                   (activeTab === 'courses' && coursesLoading) || 
                   (activeTab === 'articles' && articlesLoading);

  const currentData = getTabData();
  const isEmpty = !isLoading && currentData.length === 0;

  if (isLoading) {
    return <LoadingSpinner />;
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
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200 flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm ${
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

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {isEmpty ? (
            <EmptyState 
              icon={<BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />}
              message={`No ${activeTab} found.`}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentData.map((item) => (
                <LearningCard 
                  key={item.id} 
                  item={item} 
                  type={activeTab as 'books' | 'courses' | 'articles'} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 