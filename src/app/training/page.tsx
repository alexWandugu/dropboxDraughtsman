
import { TrainingProgramCard } from '@/components/training-program-card';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { GraduationCap } from 'lucide-react';
import type { TrainingProgram, Instructor } from '@/types';
import { firestore, collection, getDocs } from '@/lib/firebase';
import { trainingPrograms as mockTrainingPrograms } from '@/data/mock-data';

export const metadata = {
  title: 'Training Programs - Dropbox Draughtsman',
  description: "Explore our comprehensive electrical design training programs. Enhance your skills with expert-led courses in panel design, E-CAD design, power and control systems, and more.",
};

async function getTrainingPrograms(): Promise<TrainingProgram[]> {
  try {
    const programsCol = collection(firestore, 'trainingPrograms');
    const programSnapshot = await getDocs(programsCol);
    if (!programSnapshot.empty) {
        const programsList = programSnapshot.docs.map(doc => {
          const data = doc.data();
          // Firestore typically stores timestamps as Firestore Timestamp objects.
          // If your instructors are subcollections or references, you'd fetch them separately.
          // For simplicity, assuming instructors are stored as an array of objects directly.
          return {
            id: doc.id,
            ...data,
            // Ensure instructors are correctly typed if they are nested
            instructors: (data.instructors || []).map((inst: any) => ({...inst})) as Instructor[],
          } as TrainingProgram;
        });
        return programsList;
    }
  } catch (error) {
    console.error("Error fetching training programs from Firestore, falling back to mock data:", error);
  }
  
  // Fallback to mock data if Firestore is empty or fails
  console.log("No training programs found in Firestore. Using mock data.");
  return mockTrainingPrograms;
}


export default async function TrainingProgramsPage() {
  const trainingPrograms = await getTrainingPrograms();

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
