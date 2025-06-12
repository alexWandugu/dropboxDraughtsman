import type { LucideIcon } from 'lucide-react';

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
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
  imageUrl?: string; // client logo or project image
  clientImageUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}
