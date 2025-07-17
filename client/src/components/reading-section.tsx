import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, StarHalf, BookOpen, Clock, CheckCircle, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Book } from "@shared/schema";

export default function ReadingSection() {
  const [activeTab, setActiveTab] = useState('currently-reading');
  
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Filled stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 fill-none text-gray-300 stroke-current" />);
    }
    
    return stars;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'currently-reading': return Clock;
      case 'completed': return CheckCircle;
      case 'want-to-read': return Plus;
      default: return BookOpen;
    }
  };

  const filteredBooks = books?.filter(book => book.status === activeTab) || [];

  const tabs = [
    { id: 'currently-reading', label: 'Currently Reading' },
    { id: 'want-to-read', label: 'Want to Read' },
    { id: 'completed', label: 'Completed' }
  ];

  if (isLoading) {
    return (
      <section id="reading" className="section-padding bg-gradient-to-br from-muted/30 to-background">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
              <h2>Reading</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Loading my reading collection...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reading" className="section-padding bg-gradient-to-br from-muted/30 to-background">
      <div className="container-width">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2>Reading</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Books that inspire my work in technology, system design, and continuous learning.
          </p>
        </div>

        {/* Reading Status Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 inline-flex shadow-lg border border-border/50">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'gradient-subtle text-white shadow-lg scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => {
            const StatusIcon = getStatusIcon(book.status);
            return (
              <Card 
                key={book.id} 
                className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">by {book.author}</p>
                    </div>
                  </div>
                  
                  {book.rating && book.rating > 0 && (
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {renderStars(book.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">{book.rating}/5</span>
                    </div>
                  )}
                  
                  {book.status === 'currently-reading' && (
                    <div className="space-y-3">
                      <Progress value={book.progress} className="h-2 bg-muted" />
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground font-medium">
                          {book.progress}% Complete
                        </p>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-2 py-1 rounded-full text-xs">
                          Reading
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  {book.status === 'want-to-read' && (
                    <div className="space-y-3">
                      <Button 
                        size="sm"
                        className="w-full gradient-subtle text-white hover:shadow-lg transition-all duration-300"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Reading List
                      </Button>
                    </div>
                  )}
                  
                  {book.status === 'completed' && (
                    <div className="flex justify-between items-center">
                      <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full font-medium">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                      {book.rating && (
                        <div className="text-sm text-muted-foreground">
                          Rated {book.rating}/5
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No books in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
} 