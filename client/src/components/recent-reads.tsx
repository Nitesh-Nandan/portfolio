import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Book } from "@shared/schema";

export default function RecentReads() {
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  // Filter to show only currently reading books and limit to 3
  const currentlyReading = books?.filter(book => book.status === 'currently-reading').slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="flex justify-center col-span-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {currentlyReading.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {currentlyReading.map((book, index) => (
            <Card 
              key={book.id} 
              className="group bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out border border-border/50 hover:border-primary/50 hover:scale-110 hover:bg-white hover:-translate-y-3 animate-fade-in cursor-pointer h-full hover:rotate-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 md:p-6 h-full">
                <div className="flex flex-col h-full">
                  {/* Header with icon and title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 md:p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/30 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-out flex-shrink-0 group-hover:shadow-lg">
                      <BookOpen className="h-4 w-4 md:h-6 md:w-6 group-hover:animate-pulse" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h4 className="font-semibold text-foreground text-base md:text-xl leading-tight mb-1 md:mb-2 group-hover:text-primary transition-all duration-300 line-clamp-2 group-hover:scale-105 group-hover:font-bold">
                        {book.title}
                      </h4>
                      <p className="text-muted-foreground text-xs md:text-sm mb-2 truncate group-hover:text-primary/70 transition-all duration-300 group-hover:font-medium group-hover:scale-105">
                        by {book.author}
                      </p>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="flex-grow">
                    <div className="space-y-3 md:space-y-4">
                      {/* Status badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className="flex items-center gap-2 group-hover:scale-105 transition-all duration-300">
                          <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground group-hover:text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 flex-shrink-0" />
                          <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200 text-xs px-2 py-1 group-hover:bg-blue-200 group-hover:text-blue-800 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                            {book.progress}% Complete
                          </Badge>
                        </div>
                        <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-200 text-xs px-2 py-1 w-fit group-hover:bg-green-200 group-hover:text-green-800 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                          Currently Reading
                        </Badge>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="group-hover:scale-105 transition-all duration-300">
                        <Progress 
                          value={book.progress} 
                          className="w-full h-2 md:h-3 group-hover:h-4 md:group-hover:h-5 transition-all duration-500 group-hover:shadow-lg"
                        />
                      </div>
                      
                      {/* Rating */}
                      {book.rating > 0 && (
                        <div className="flex items-center gap-1 group-hover:scale-110 transition-all duration-300">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 md:h-4 md:w-4 transition-all duration-300 group-hover:scale-125 ${i < book.rating ? 'fill-yellow-400 text-yellow-400 group-hover:fill-yellow-500 group-hover:text-yellow-500' : 'text-gray-300 group-hover:text-gray-400'}`}
                              style={{ transitionDelay: `${i * 0.05}s` }}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1 group-hover:text-primary group-hover:font-semibold transition-all duration-300">({book.rating}/5)</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Footer with book image and description */}
                  <div className="mt-4 pt-3 md:pt-4 border-t border-gray-100 group-hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-10 md:w-12 md:h-16 rounded-md overflow-hidden shadow-sm group-hover:shadow-xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 ease-out flex-shrink-0">
                        <img 
                          src={book.image} 
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                        />
                      </div>
                      <div className="flex-1 text-xs md:text-sm text-muted-foreground group-hover:scale-105 transition-all duration-300">
                        <div className="bg-muted/50 rounded-md p-1.5 md:p-2 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:border group-hover:border-primary/30 transition-all duration-300">
                          <span className="line-clamp-2 group-hover:text-primary/90 group-hover:font-medium transition-all duration-300">
                            Enhancing knowledge in backend systems and architecture
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 md:py-12">
          <BookOpen className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground/30 mx-auto mb-3 md:mb-4 hover:text-primary/50 hover:scale-125 hover:rotate-12 transition-all duration-500 cursor-pointer" />
          <p className="text-muted-foreground text-base md:text-lg hover:text-primary hover:scale-105 transition-all duration-300">No books currently being read.</p>
        </div>
      )}
    </div>
  );
} 