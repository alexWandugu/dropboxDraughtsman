
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types';
import { CalendarIcon, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <CardHeader className="p-0 relative">
        <div className="aspect-video relative">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={project.dataAihint}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <Badge variant="secondary" className="mb-2 w-fit">{project.category}</Badge>
        <CardTitle className="text-xl font-headline mb-2 text-primary">{project.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4 flex-grow">
          {project.description}
        </CardDescription>
        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-auto pt-4 border-t border-border/20">
          <CalendarIcon className="h-3 w-3" /> {project.date}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30 flex flex-wrap gap-2">
         {project.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
         ))}
      </CardFooter>
      {/* Optional: Add a link to a detailed project page if slug exists */}
      {/* 
      <CardFooter className="p-6 bg-muted/30 mt-auto">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/projects/${project.slug}`}>
            View Details <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
      */}
    </Card>
  );
}
