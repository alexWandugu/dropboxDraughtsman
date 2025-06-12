import { TestimonialCard } from '@/components/testimonial-card';
import { testimonials } from '@/data/mock-data';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Users } from 'lucide-react';

export const metadata = {
  title: 'Testimonials - CircuitFlow',
  description: 'Read what our clients say about CircuitFlow. Discover success stories and testimonials from businesses and professionals who have benefited from our electrical design training and consultation services.',
};

export default function TestimonialsPage() {
  return (
    <SectionContainer>
      <SectionTitle subtitle="Real Feedback from Our Satisfied Clients and Partners">
        Client Success Stories
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
       {testimonials.length === 0 && (
        <div className="text-center py-12">
            <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No testimonials available yet. We're working on collecting feedback!</p>
        </div>
      )}
    </SectionContainer>
  );
}
