
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Briefcase } from 'lucide-react';

export default async function ProjectsPage() {
  return (
    <SectionContainer>
      <SectionTitle subtitle="A showcase of our successfully delivered projects and past events">
        Projects Catalogue
      </SectionTitle>
      <div className="text-center py-20">
        <Briefcase className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h2 className="text-4xl font-headline font-bold text-primary mb-4">Coming Soon!</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We are currently curating our portfolio of completed projects and past events. Please check back soon to see our work in action.
        </p>
      </div>
    </SectionContainer>
  );
}
