import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Resource } from '@/types';
import { Download, BookOpen, ExternalLink, CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const ResourceIcon = resource.icon || BookOpen;
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up opacity-0" style={{animationDelay: `${Math.random() * 0.5}s`}}>
      {resource.imageUrl && (
        <CardHeader className="p-0 relative">
          <div className="aspect-video relative">
            <Image
              src={resource.imageUrl}
              alt={resource.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={resource.dataAihint || "technical document"}
            />
          </div>
        </CardHeader>
      )}
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <ResourceIcon className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-headline text-primary">{resource.title}</CardTitle>
        </div>
        <Badge variant="secondary" className="mb-2 capitalize">{resource.category}</Badge>
        <CardDescription className="text-sm text-muted-foreground mb-4 h-16 overflow-hidden text-ellipsis">
          {resource.description}
        </CardDescription>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <CalendarIcon className="h-3 w-3" /> Published: {new Date(resource.publishedDate).toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30">
        {resource.downloadUrl ? (
          <Button asChild variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={resource.downloadUrl} target={resource.type === 'video' ? '_blank' : '_self'} download={resource.type !== 'video'}>
              {resource.type === 'guide' || resource.type === 'datasheet' ? <Download className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
              {resource.type === 'guide' || resource.type === 'datasheet' ? 'Download' : (resource.type === 'video' ? 'Watch Video' : 'Read More')}
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full">
            {/* In a real app, this would link to a detailed resource page e.g. /resources/${resource.slug} */}
            <Link href={`/resources#${resource.slug}`}>
              Read More <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
