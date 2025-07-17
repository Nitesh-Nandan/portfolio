import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@shared/schema";

export default function RecentReads() {
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  // Filter to show only currently reading books and limit to 3
  const currentlyReading = books?.filter(book => book.status === 'currently-reading').slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentlyReading.map((book) => (
        <Card 
          key={book.id} 
          className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 h-full"
        >
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-50 text-green-600 flex-shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                
                <div className="flex-grow min-w-0">
                  <h4 className="font-semibold text-gray-900 text-xl leading-tight mb-2">
                    {book.title}
                  </h4>
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  by {book.author}
                </p>
              </div>
              
              <div className="space-y-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="secondary" 
                    className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-1 rounded-md"
                  >
                    Currently Reading
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {currentlyReading.length === 0 && (
        <div className="text-center py-8 col-span-full">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No books currently being read.</p>
        </div>
      )}
    </div>
  );
} 