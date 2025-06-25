
import { firestore, collection, query, where, getDocs, limit } from '@/lib/firebase';
import type { TrainingProgram, Instructor } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SectionContainer } from '@/components/common/section-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Clock, Users, Tag, CalendarDays, ArrowRight, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

async function getTrainingProgramBySlug(slug: string): Promise<TrainingProgram | null> {
  try {
    const programsRef = collection(firestore, 'trainingPrograms');
    const q = query(programsRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    // Ensure instructors are correctly typed if they are nested
    const instructors = (data.instructors || []).map((inst: any) => ({ ...inst })) as Instructor[];

    return {
      id: doc.id,
      ...data,
      instructors,
    } as TrainingProgram;
  } catch (error) {
    console.error("Error fetching training program by slug from Firestore:", error);
    return null;
  }
}

async function getAllTrainingProgramSlugs(): Promise<{ slug: string }[]> {
  try {
    const programsCol = collection(firestore, 'trainingPrograms');
    const programSnapshot = await getDocs(programsCol);
    return programSnapshot.docs.map(doc => ({ slug: doc.data().slug as string }));
  } catch (error) {
    console.error("Error fetching all training program slugs:", error);
    return [];
  }
}


export async function generateStaticParams() {
  const slugs = await getAllTrainingProgramSlugs();
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const program = await getTrainingProgramBySlug(params.slug);

  if (!program) {
    return {
      title: 'Program Not Found',
      description: 'The requested training program could not be found.',
    };
  }

  return {
    title: `${program.title} - Dropbox Draughtsman`,
    description: program.shortDescription,
  };
}


export default async function TrainingProgramPage({ params }: { params: { slug: string } }) {
  const program = await getTrainingProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  const ProgramIcon = program.icon || BookOpen;

  return (
    <SectionContainer>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-3">{program.title}</h1>
          <p className="text-xl text-muted-foreground">{program.shortDescription}</p>
        </div>
        
        {program.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl mb-12">
            <Image 
              src={program.image}
              alt={program.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={program.dataAihint || "education technology"}
              priority
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-3xl font-headline font-semibold text-primary border-b pb-2">About This Program</h2>
            <p className="text-muted-foreground whitespace-pre-line">{program.detailedDescription}</p>

            <h2 className="text-3xl font-headline font-semibold text-primary border-b pb-2">What You'll Learn</h2>
            <ul className="space-y-3">
              {program.learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{learning}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-accent">Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-muted-foreground">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Schedule</p>
                    <p className="text-muted-foreground">{program.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Price</p>
                    <p className="text-muted-foreground">{program.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/schedule">Schedule This Program <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-headline font-semibold text-primary border-b pb-2 mb-8">Meet Your Instructors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {program.instructors.map(instructor => (
              <Card key={instructor.id} className="flex items-center gap-4 p-4 shadow-md">
                 <Avatar className="h-20 w-20">
                  <AvatarImage src={instructor.imageUrl} alt={instructor.name} data-ai-hint={instructor.dataAihint} />
                  <AvatarFallback>{instructor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{instructor.name}</h3>
                  <p className="text-sm text-accent font-semibold">{instructor.specialization}</p>
                  <p className="text-xs text-muted-foreground mt-1">{instructor.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
