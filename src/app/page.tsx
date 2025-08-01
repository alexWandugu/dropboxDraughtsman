import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AiRecommendationTool } from '@/components/ai-recommendation-tool';
import { TrainingProgramCard } from '@/components/training-program-card';
import { ResourceCard } from '@/components/resource-card';
import { TestimonialCard } from '@/components/testimonial-card';
import { trainingPrograms, resources, testimonials } from '@/data/mock-data';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const featuredPrograms = trainingPrograms.slice(0, 3);
  const featuredResources = resources.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 2);

  const coreServices = [
    "Expert Training Programs",
    "Personalized Consultations",
    "Comprehensive Resource Library",
    "Panel Building & Design Expertise"
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <SectionContainer className="bg-gradient-to-br from-background via-card to-background pt-20 md:pt-28 lg:pt-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6 text-primary animate-slide-up opacity-0" style={{animationDelay: '0.1s'}}>
          Powering Your Electrical Design Expertise in Kenya
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up opacity-0" style={{animationDelay: '0.2s'}}>
          Dropbox Draughtsman offers cutting-edge training, expert consultation, and valuable resources for electrical design professionals and enthusiasts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 animate-slide-up opacity-0" style={{animationDelay: '0.3s'}}>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/training">Explore Training Programs</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/consultation">Request Consultation</Link>
          </Button>
        </div>
      </SectionContainer>

      {/* AI Recommendation Tool Section */}
      <SectionContainer id="ai-advisor" className="bg-card">
        <AiRecommendationTool />
      </SectionContainer>
      
      {/* Core Services Section */}
      <SectionContainer id="services">
        <SectionTitle subtitle="Our Commitment to Your Success">Core Services</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreServices.map((service, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up opacity-0" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
              <CheckCircle className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-xl font-semibold font-headline mb-2 text-primary">{service}</h3>
              <p className="text-sm text-muted-foreground">Delivering excellence and innovation in every aspect of electrical design.</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Featured Training Programs Section */}
      <SectionContainer id="featured-training" className="bg-background">
        <SectionTitle subtitle="Upskill with Our Expert-Led Courses">Featured Training Programs</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPrograms.map((program) => (
            <TrainingProgramCard key={program.id} program={program} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="link" className="text-lg text-accent hover:text-accent/80">
            <Link href="/training">
              View All Training Programs <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </SectionContainer>

      {/* Featured Resources Section */}
      <SectionContainer id="featured-resources" className="bg-card">
        <SectionTitle subtitle="Knowledge at Your Fingertips">Resource Hub</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="link" className="text-lg text-accent hover:text-accent/80">
            <Link href="/resources">
              Explore All Resources <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </SectionContainer>

      {/* Testimonials Section */}
      <SectionContainer id="testimonials" className="bg-background">
        <SectionTitle subtitle="Success Stories from Our Valued Clients">What Our Clients Say</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="link" className="text-lg text-accent hover:text-accent/80">
            <Link href="/testimonials">
              Read More Testimonials <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </SectionContainer>

      {/* Call to Action Section */}
      <SectionContainer className="bg-gradient-to-r from-primary via-primary/90 to-accent/90 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 text-primary-foreground">Ready to Elevate Your Electrical Design Skills?</h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
          Join our training programs, request expert consultation, or explore our resource library today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <Link href="/schedule">Schedule a Session</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/consultation">Get in Touch</Link>
          </Button>
        </div>
      </SectionContainer>
    </div>
  );
}
