
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { TrainingProgram } from '@/types';
import { ArrowRight, Clock, Users, Tag, CalendarDays } from 'lucide-react';

interface TrainingProgramCardProps {
  program: TrainingProgram;
}

export function TrainingProgramCard({ program }: TrainingProgramCardProps) {
  const ProgramIcon = program.icon;
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up opacity-0" style={{animationDelay: `${Math.random() * 0.5}s`}}>
      <CardHeader className="relative p-0">
        {program.image && (
          <div className="aspect-video relative">
            <Image
              src={program.image}
              alt={program.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={program.dataAihint || "education technology"}
            />
             {ProgramIcon && (
              <div className="absolute top-4 right-4 bg-primary/80 text-primary-foreground p-2 rounded-full shadow-md">
                <ProgramIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-headline mb-2 text-primary">{program.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4 h-20 overflow-hidden text-ellipsis">
          {program.shortDescription}
        </CardDescription>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <span>Duration: {program.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-accent" />
            <span>Schedule: {program.schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-accent" />
            <span>Price: {program.price}</span>
          </div>
           {program.instructors.length > 0 && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span>Instructors: {program.instructors.map(inst => inst.name).join(', ')}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30">
        <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/training/${program.slug}`}> 
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
