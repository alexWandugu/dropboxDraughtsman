
import { firestore, collection, getDocs } from '@/lib/firebase';
import { trainingPrograms as mockTrainingPrograms, resources as mockResources, projects as mockProjects } from '@/data/mock-data';
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

async function getProjectSlugs(): Promise<{ slug: string }[]> {
    // For now, we will use mock data for projects.
    // In the future, this can be updated to fetch from Firestore.
    return mockProjects.map(p => ({ slug: p.slug }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dropboxdraughtsman.vercel.app';
  const lastModified = new Date();

  const staticRoutes = [
    '/',
    '/about',
    '/projects',
    '/resources',
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

  const projectSlugs = await getProjectSlugs();
  const projectRoutes = projectSlugs.map(({ slug }) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified,
      priority: 0.7, // Same as training programs
      changeFrequency: 'monthly' as 'monthly',
  }));

  return [
    ...staticRoutes,
    ...trainingProgramRoutes,
    ...resourceRoutes,
    ...projectRoutes,
  ];
}
