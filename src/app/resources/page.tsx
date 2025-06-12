import { ResourceCard } from '@/components/resource-card';
import { resources } from '@/data/mock-data';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { BookOpen } from 'lucide-react';
// TODO: Add filtering/search functionality in the future

export const metadata = {
  title: 'Resource Library - CircuitFlow',
  description: 'Access our library of electrical design resources, including guides, articles, datasheets, and video tutorials on panel building, IEC standards, and more.',
};

export default function ResourcesPage() {
  return (
    <SectionContainer>
      <SectionTitle subtitle="Your Hub for Electrical Design Knowledge and Best Practices">
        Resource Library
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      {resources.length === 0 && (
        <div className="text-center py-12">
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No resources available at the moment. Please check back soon!</p>
        </div>
      )}
    </SectionContainer>
  );
}
