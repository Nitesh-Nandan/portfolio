import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, StarHalf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Book } from "@shared/schema";

export default function BookshelfSection() {
  const [activeTab, setActiveTab] = useState('currently-reading');
  
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-current text-accent" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-current text-accent" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  const filteredBooks = books?.filter(book => book.status === activeTab) || [];

  const tabs = [
    { id: 'currently-reading', label: 'Currently Reading' },
    { id: 'want-to-read', label: 'Want to Read' },
    { id: 'completed', label: 'Completed' }
  ];

  if (isLoading) {
    return (
      <section id="bookshelf" className="min-h-screen bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">My BookShelf</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">Loading books...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="bookshelf" className="min-h-screen bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">My BookShelf</h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            A curated collection of books that have shaped my thinking in technology, design, and personal development.
          </p>
        </div>

        {/* Reading Status Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-neutral rounded-lg p-1 inline-flex">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white' 
                    : 'text-muted hover:text-secondary'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="bg-neutral rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-secondary mb-2">{book.title}</h3>
                <p className="text-muted mb-3">by {book.author}</p>
                
                {book.rating > 0 && (
                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {renderStars(book.rating)}
                    </div>
                    <span className="text-sm text-muted">{book.rating}/5</span>
                  </div>
                )}
                
                {book.status === 'currently-reading' && (
                  <>
                    <Progress value={book.progress} className="mb-3" />
                    <p className="text-sm text-muted">{book.progress}% Complete</p>
                  </>
                )}
                
                {book.status === 'want-to-read' && (
                  <Button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                    Add to Reading List
                  </Button>
                )}
                
                {book.status === 'completed' && (
                  <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
