
import { firestore, collection, getDocs } from '@/lib/firebase';
import { trainingPrograms as mockTrainingPrograms } from '@/data/mock-data';
import { resources as mockResources } from '@/data/mock-data';
import type { MetadataRoute } from 'next';

async function getTrainingProgramSlugs(): Promise<{ slug: string }[]> {
  try {
    const programsCol = collection(firestore, 'trainingPrograms');
    const programSnapshot = await getDocs(programsCol);
    if (!programSnapshot.empty) {
      return programSnapshot.docs.map(doc => ({ slug: doc.data().slug as string }));
    }
  } catch (error) {
    console.error("Error fetching training program slugs from Firestore for sitemap, falling back to mock data:", error);
  }
  return mockTrainingPrograms.map(p => ({ slug: p.slug }));
}

async function getResourceSlugs(): Promise<{ slug: string }[]> {
  try {
    const resourcesCol = collection(firestore, 'resources');
    const resourceSnapshot = await getDocs(resourcesCol);
    if (!resourceSnapshot.empty) {
      return resourceSnapshot.docs.map(doc => ({ slug: doc.data().slug as string }));
    }
  } catch (error) {
    console.error("Error fetching resource slugs from Firestore for sitemap, falling back to mock data:", error);
  }
  return mockResources.map(r => ({ slug: r.slug }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // IMPORTANT: Set your production domain in your environment variables
  // (e.g., in a .env.local file) as NEXT_PUBLIC_SITE_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dropboxdraughtsman.vercel.app';
  const lastModified = new Date();

  const staticRoutes = [
    '/',
    '/about',
    // '/attachment-program',
    // '/consultation',
    // '/guidance',
    // '/login',
    // '/privacy',
    '/resources',
    // '/schedule',
    // '/terms',
    // '/testimonials',
    '/training',
  ].map(route => ({
    url: `${siteUrl}${route}`,
    lastModified,
    priority: route === '/' ? 1.0 : 0.8,
    changeFrequency: 'daily' as 'daily',
  }));

  const trainingProgramSlugs = await getTrainingProgramSlugs();
  const trainingProgramRoutes = trainingProgramSlugs.map(({ slug }) => ({
    url: `${siteUrl}/training/${slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: 'monthly' as 'monthly',
  }));
  
  const resourceSlugs = await getResourceSlugs();
  const resourceRoutes = resourceSlugs.map(({ slug }) => ({
    url: `${siteUrl}/resources/${slug}`,
    lastModified,
    priority: 0.6,
    changeFrequency: 'monthly' as 'monthly',
  }));

  return [
    ...staticRoutes,
    ...trainingProgramRoutes,
    ...resourceRoutes,
  ];
}
