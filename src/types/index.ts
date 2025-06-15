
import type { LucideIcon } from 'lucide-react';

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  dataAihint?: string;
  specialization: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  schedule: string;
  duration: string;
  price: string;
  instructors: Instructor[];
  icon?: LucideIcon;
  image?: string;
  dataAihint?: string;
  learnings: string[];
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  downloadUrl?: string;
  content?: string; // For inline articles
  type: 'guide' | 'article' | 'datasheet' | 'video';
  icon?: LucideIcon;
  imageUrl?: string;
  dataAihint?: string;
  category: string;
  publishedDate: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  testimonial: string;
  projectTitle?: string;
  caseStudySummary?: string;
  imageUrl?: string; 
  dataAihintSecondary?: string;
  clientImageUrl?: string;
  dataAihint?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface ShowcaseActivity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAihint: string;
  link?: string;
  category: string;
}
