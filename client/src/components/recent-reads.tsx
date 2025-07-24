import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BookOpen, GraduationCap, FileText, ExternalLink, 
  CheckCircle, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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



  const getProgress = () => {
    if (type === 'books' && 'progress' in item && item.progress !== null) {
      return item.progress;
    }
    if (type === 'courses' && 'progress' in item && item.progress !== null) {
      return item.progress;
    }
    return null;
  };

  const progress = getProgress();

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
      
      {progress !== null && progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
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

export default function RecentReads() {
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
        return books?.slice(0, 3) || [];
      case 'courses':
        return courses?.slice(0, 3) || [];
      case 'articles':
        return articles?.slice(0, 3) || [];
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
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
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
  );
} 