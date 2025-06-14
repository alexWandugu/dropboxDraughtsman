import { TrainingProgramCard } from '@/components/training-program-card';
import { trainingPrograms } from '@/data/mock-data';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'Training Programs - Dropbox Draughtsman',
  description: "Explore our comprehensive electrical design training programs. Enhance your skills with expert-led courses in panel design, E-CAD design, power and control systems, and more.",
};

export default function TrainingProgramsPage() {
  return (
    <SectionContainer>
      <SectionTitle subtitle="Invest in Your Future with Our Expert-Led Training">
        Our Training Programs
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainingPrograms.map((program) => (
          <TrainingProgramCard key={program.id} program={program} />
        ))}
      </div>
      {trainingPrograms.length === 0 && (
         <div className="text-center py-12">
            <GraduationCap className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No training programs available at the moment. Please check back soon!</p>
        </div>
      )}
    </SectionContainer>
  );
}
