import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import type { Testimonial } from "@shared/schema";
import { api } from "@/lib/api";



function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border border-gray-200/60 hover:border-gray-300/80 hover:shadow-lg hover:shadow-gray-200/30 transition-all duration-300 hover:scale-[1.01] rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
            {testimonial.avatar}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground text-base mb-1">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground font-medium">{testimonial.role}</p>
          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        </div>
      </div>
      
      <div className="relative">
        <Quote className="absolute -top-1 -left-1 h-5 w-5 text-gray-300/60" />
        <p className="text-sm text-muted-foreground leading-relaxed pl-6">
          {testimonial.content}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    queryFn: api.getTestimonials,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">What People Say</h3>
          <p className="text-sm text-muted-foreground">Testimonials from colleagues and clients</p>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">What People Say</h3>
          <p className="text-sm text-muted-foreground">Testimonials from colleagues and clients</p>
        </div>
        <div className="text-center text-muted-foreground py-8">
          <p>Unable to load testimonials</p>
        </div>
      </div>
    );
  }

  // Filter out deleted testimonials
  const activeTestimonials = testimonials?.filter(testimonial => !testimonial.is_deleted) || [];

  // Don't render anything if there are no active testimonials
  if (activeTestimonials.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">What People Say</h3>
        <p className="text-sm text-muted-foreground">Testimonials from colleagues and clients</p>
      </div>
      
      <div className="space-y-4">
        {activeTestimonials.map((testimonial, index) => (
          <div key={testimonial.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
} 