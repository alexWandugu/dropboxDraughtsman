import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Testimonial } from '@/types';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card animate-slide-up opacity-0" style={{animationDelay: `${Math.random() * 0.5}s`}}>
      <CardContent className="p-6 flex-grow flex flex-col">
        <Quote className="h-8 w-8 text-primary mb-4 transform -scale-x-100" />
        <p className="text-muted-foreground italic mb-6 flex-grow">"{testimonial.testimonial}"</p>
        
        <div className="flex items-center mt-auto pt-4 border-t border-border/40">
          {testimonial.clientImageUrl && (
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={testimonial.clientImageUrl} alt={testimonial.clientName} data-ai-hint={testimonial.dataAihint || "person corporate"} />
              <AvatarFallback>{testimonial.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="font-semibold text-foreground">{testimonial.clientName}</p>
            {testimonial.company && <p className="text-sm text-muted-foreground">{testimonial.company}</p>}
          </div>
        </div>
        {testimonial.projectTitle && (
          <p className="text-sm text-accent mt-2 pt-2 border-t border-border/20">Project: {testimonial.projectTitle}</p>
        )}
      </CardContent>
      {testimonial.imageUrl && (
         <CardFooter className="p-0">
           <div className="aspect-video relative w-full">
              <Image 
                src={testimonial.imageUrl} 
                alt={testimonial.projectTitle || `Project by ${testimonial.clientName}`}
                layout="fill"
                objectFit="cover"
                data-ai-hint={testimonial.dataAihintSecondary || "project image"}
              />
           </div>
         </CardFooter>
      )}
    </Card>
  );
}
