import { TestimonialCard } from '@/components/testimonial-card';
import { testimonials as mockTestimonials } from '@/data/mock-data';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Users } from 'lucide-react';
import type { Testimonial } from '@/types';
import { firestore, collection, getDocs } from '@/lib/firebase';

export const metadata = {
  title: 'Testimonials - Dropbox Draughtsman',
  description: 'Read what our clients say about Dropbox Draughtsman. Discover success stories and testimonials from businesses and professionals who have benefited from our electrical design training and consultation services.',
  alternates: {
    canonical: '/testimonials',
  },
};

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonialsCol = collection(firestore, 'testimonials');
    const testimonialSnapshot = await getDocs(testimonialsCol);
    if (!testimonialSnapshot.empty) {
      return testimonialSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
    }
  } catch (error) {
    console.error("Error fetching testimonials from Firestore, falling back to mock data:", error);
  }

  console.log("No testimonials found in Firestore. Using mock data.");
  return mockTestimonials;
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

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
