
import { firestore, collection, query, where, getDocs, limit } from '@/lib/firebase';
import type { Resource } from '@/types';
import { resources as mockResources } from '@/data/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SectionContainer } from '@/components/common/section-container';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

async function getResourceBySlug(slug: string): Promise<Resource | null> {
  try {
    const resourcesRef = collection(firestore, 'resources');
    const q = query(resourcesRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Resource;
    }
  } catch (error) {
    console.error(`Error fetching resource with slug '${slug}' from Firestore, will check mock data:`, error);
  }
  
  console.log(`Resource with slug '${slug}' not found in Firestore. Checking mock data.`);
  const resource = mockResources.find(r => r.slug === slug);
  return resource || null;
}

async function getAllResourceSlugs(): Promise<{ slug: string }[]> {
  let slugs: { slug: string }[] = [];
  try {
    const resourcesCol = collection(firestore, 'resources');
    const resourceSnapshot = await getDocs(resourcesCol);
    if (!resourceSnapshot.empty) {
      slugs = resourceSnapshot.docs.map(doc => ({ slug: doc.data().slug as string }));
    }
  } catch (error) {
    console.error("Error fetching all resource slugs from Firestore, will use mock data:", error);
  }

  if (slugs.length === 0) {
    console.log("No slugs found in Firestore. Using mock data for static generation.");
    slugs = mockResources.map(p => ({ slug: p.slug }));
  }
  
  return slugs;
}

export async function generateStaticParams() {
  const slugs = await getAllResourceSlugs();
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resource = await getResourceBySlug(params.slug);

  if (!resource) {
    return {
      title: 'Resource Not Found',
      description: 'The requested resource could not be found.',
    };
  }

  return {
    title: `${resource.title} - Dropbox Draughtsman`,
    description: resource.description,
    alternates: {
      canonical: `/resources/${resource.slug}`,
    },
  };
}

function getYouTubeVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}


export default async function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = await getResourceBySlug(params.slug);

  if (!resource) {
    notFound();
  }

  const formattedContent = resource.content
    ? resource.content
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/\n/g, '<br />')
    : '';

  const isExternalLink = resource.downloadUrl?.startsWith('http');
  const isVideo = resource.type === 'video';
  const videoId = isVideo && resource.downloadUrl ? getYouTubeVideoId(resource.downloadUrl) : null;

  return (
    <SectionContainer>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <Badge variant="secondary" className="mb-2 capitalize">{resource.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-3">{resource.title}</h1>
          <p className="text-lg text-muted-foreground">{resource.description}</p>
          <p className="text-sm text-muted-foreground mt-2">Published on: {new Date(resource.publishedDate).toLocaleDateString()}</p>
        </div>
        
        {isVideo && videoId ? (
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl mb-12 bg-black">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : resource.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl mb-12">
            <Image 
              src={resource.imageUrl}
              alt={resource.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={resource.dataAihint || "technical resource"}
              priority
            />
          </div>
        )}

        {resource.content && (
          <article className="prose prose-invert max-w-none text-muted-foreground prose-h3:text-primary prose-h3:font-headline prose-headings:font-headline">
             <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </article>
        )}
        
        {resource.downloadUrl && !videoId && (
          <div className="text-center mt-12">
             <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link
                  href={resource.downloadUrl}
                  target={isExternalLink ? '_blank' : '_self'}
                  download={!isExternalLink}
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                >
                  {isExternalLink ? <ExternalLink className="mr-2 h-5 w-5" /> : <Download className="mr-2 h-5 w-5" />}
                  {'View Document'}
                </Link>
            </Button>
          </div>
        )}
        
        {resource.downloadUrl && isVideo && !videoId && (
           <div className="text-center mt-12">
             <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Watch Video
                </Link>
            </Button>
          </div>
        )}

      </div>
    </SectionContainer>
  );
}
