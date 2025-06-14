import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import Image from 'next/image';
import { Users, Zap, Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'About Us - Dropbox Draughtsman',
  description: 'Learn more about Dropbox Draughtsman, our mission, vision, and the team dedicated to advancing electrical design expertise in Kenya.',
};

export default function AboutPage() {
  return (
    <SectionContainer>
      <SectionTitle subtitle="Pioneering Electrical Design Excellence in Kenya">
        About Dropbox Draughtsman
      </SectionTitle>
      
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Our Mission</h3>
          <p className="text-lg text-muted-foreground mb-4">
            To empower electrical design professionals and enthusiasts in Kenya with cutting-edge knowledge, practical skills, and expert support, fostering innovation and excellence in the field.
          </p>
          <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Our Vision</h3>
          <p className="text-lg text-muted-foreground">
            To be the leading hub for electrical design training, consultation, and resources in East Africa, driving technological advancement and sustainable development.
          </p>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="Dropbox Draughtsman Team Working" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="team collaboration"
          />
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-3xl font-headline font-semibold text-center text-primary mb-8">Why Choose Dropbox Draughtsman?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-md text-center">
            <Users className="h-12 w-12 text-accent mx-auto mb-4" />
            <h4 className="text-xl font-headline font-semibold mb-2">Expert Instructors</h4>
            <p className="text-sm text-muted-foreground">Learn from industry veterans with years of practical experience and a passion for teaching.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center">
            <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
            <h4 className="text-xl font-headline font-semibold mb-2">Practical Approach</h4>
            <p className="text-sm text-muted-foreground">Our training emphasizes hands-on learning and real-world applications to ensure you're job-ready.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center">
            <Lightbulb className="h-12 w-12 text-accent mx-auto mb-4" />
            <h4 className="text-xl font-headline font-semibold mb-2">Innovative Solutions</h4>
            <p className="text-sm text-muted-foreground">We stay at the forefront of electrical design technology to provide you with the latest knowledge and tools.</p>
          </div>
        </div>
      </div>
      
      {/* Placeholder for Team Section */}
      {/* <SectionTitle subtitle="Meet the Passionate Individuals Behind CircuitFlow">Our Team</SectionTitle>
      <p className="text-center text-muted-foreground">Team information coming soon.</p> */}

    </SectionContainer>
  );
}
