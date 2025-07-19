import { BookOpen } from "lucide-react";
import type { Book } from "@shared/schema";
import { useCurrentlyReadingBooks } from "@/hooks/use-data-queries";
import { getReadingIconStyles } from "@/lib/ui-utils";
import { GRID_STYLES, TYPOGRAPHY_STYLES } from "@/lib/ui-constants";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SectionCard, CardHeader, CardContentArea, CardFooter } from "@/components/ui/section-card";
import { SingleBadge } from "@/components/ui/technology-badges";
import { EmptyState } from "@/components/ui/empty-state";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const iconStyles = getReadingIconStyles();

  return (
    <SectionCard key={book.id}>
      <CardHeader
        icon={
          <div className={iconStyles}>
            <BookOpen className="h-6 w-6" />
          </div>
        }
        title={book.title}
      />
      
      <CardContentArea>
        <p className={TYPOGRAPHY_STYLES.cardSubtitle}>
          by {book.author}
        </p>
      </CardContentArea>
      
      <CardFooter>
        <SingleBadge text="Currently Reading" variant="reading" />
      </CardFooter>
    </SectionCard>
  );
}

export default function RecentReads() {
  const { data: books, loading: isLoading, error } = useCurrentlyReadingBooks();
  const isEmpty = !isLoading && (!books || books.length === 0);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={GRID_STYLES.responsive}>
      {books && books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      
      {isEmpty && (
        <EmptyState 
          icon={<BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
          message="No books currently being read."
        />
      )}
    </div>
  );
} 