import type { TrainingProgram, Instructor, Resource, Testimonial } from '@/types';
import { Zap, CircuitBoard, Lightbulb, FileText, Download, Video, Star, Users, GraduationCap, BookOpen, MessageCircle, CalendarDays, DraftingCompass, Settings, SlidersHorizontal, Home } from 'lucide-react';

export const instructors: Instructor[] = [
  { id: 'inst1', name: 'Eng. Jane Doe', bio: 'Lead Electrical Engineer with 15+ years of experience in industrial automation and panel design. Certified trainer for Siemens and Schneider Electric systems.', imageUrl: 'https://placehold.co/100x100.png', specialization: 'Industrial Automation' ,},
  { id: 'inst2', name: 'Dr. John Smith', bio: 'PhD in Electrical Engineering, specializing in renewable energy systems and power distribution. Published author and conference speaker.', imageUrl: 'https://placehold.co/100x100.png', specialization: 'Renewable Energy',},
  { id: 'inst3', name: 'Alice Wanjiru', bio: 'Expert in CAD software for electrical design (AutoCAD Electrical, EPLAN). 10 years of experience in creating detailed schematics and layouts.', imageUrl: 'https://placehold.co/100x100.png', specialization: 'CAD Design', },
];

export const trainingPrograms: TrainingProgram[] = [
  {
    id: 'tp1',
    slug: 'panel-design-masterclass',
    title: 'Electrical Panel Design Masterclass',
    shortDescription: 'Comprehensive training on designing and building safe and efficient electrical panels.',
    detailedDescription: 'This masterclass covers everything from component selection, wiring standards, to safety regulations for electrical panel design. Suitable for technicians and engineers looking to upgrade their skills. Includes hands-on sessions.',
    schedule: 'Mon-Fri, 9 AM - 5 PM',
    duration: '4 Weeks',
    price: 'KES 50,000',
    instructors: [instructors[0], instructors[2]],
    icon: CircuitBoard,
    image: 'https://placehold.co/600x400.png',
    dataAihint: 'electrical panel',
    learnings: ['IEC standards compliance', 'Component selection & sizing', 'Control panel wiring', 'Troubleshooting techniques']
  },
  {
    id: 'tp2',
    slug: 'autocad-electrical-essentials',
    title: 'AutoCAD Electrical Essentials',
    shortDescription: 'Learn to create professional electrical drawings and schematics using AutoCAD Electrical.',
    detailedDescription: 'Master the essential tools and techniques of AutoCAD Electrical. This course will guide you through creating schematic diagrams, panel layouts, and generating reports. Perfect for drafters and designers.',
    schedule: 'Weekends, 10 AM - 4 PM',
    duration: '6 Weeks',
    price: 'KES 35,000',
    instructors: [instructors[2]],
    icon: DraftingCompass,
    image: 'https://placehold.co/600x400.png',
    dataAihint: 'software interface',
    learnings: ['Schematic design', 'Panel layout creation', 'PLC I/O drawings', 'Report generation']
  },
  {
    id: 'tp3',
    slug: 'solar-pv-system-design',
    title: 'Solar PV System Design & Installation',
    shortDescription: 'In-depth course on designing, sizing, and installing solar photovoltaic systems.',
    detailedDescription: 'Gain expertise in solar PV technology, from site assessment and system sizing to installation best practices and commissioning. Covers both grid-tied and off-grid systems.',
    schedule: 'Flexible Online Modules + 1 Week Practical',
    duration: '8 Weeks (Online) + 1 Week (Practical)',
    price: 'KES 60,000',
    instructors: [instructors[1]],
    icon: Zap,
    image: 'https://placehold.co/600x400.png',
    dataAihint: 'solar panels',
    learnings: ['PV system components', 'Site assessment', 'System sizing and design', 'Installation & commissioning']
  },
];

export const resources: Resource[] = [
  {
    id: 'res1',
    slug: 'guide-iec-61439',
    title: 'Comprehensive Guide to IEC 61439 Standards',
    description: 'A detailed guide explaining the IEC 61439 standards for low-voltage switchgear and controlgear assemblies.',
    type: 'guide',
    icon: FileText,
    downloadUrl: '/downloads/iec-61439-guide.pdf',
    category: 'Standards',
    publishedDate: '2023-10-15',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAihint: 'technical document',
  },
  {
    id: 'res2',
    slug: 'article-panel-building-tips',
    title: 'Top 10 Tips for Efficient Panel Building',
    description: 'An article sharing practical tips for improving efficiency and quality in electrical panel building.',
    type: 'article',
    icon: Lightbulb,
    content: 'Detailed content for the article goes here...',
    category: 'Best Practices',
    publishedDate: '2023-11-01',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAihint: 'workshop tools',
  },
  {
    id: 'res3',
    slug: 'video-vfd-setup',
    title: 'Video Tutorial: Basic VFD Setup',
    description: 'A step-by-step video tutorial on configuring a Variable Frequency Drive for motor control.',
    type: 'video',
    icon: Video,
    downloadUrl: 'https://www.youtube.com/watch?v=example', // Link to a video
    category: 'Tutorials',
    publishedDate: '2023-09-20',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAihint: 'electrical component',
  },
   {
    id: 'res4',
    slug: 'datasheet-circuit-breaker-xyz',
    title: 'Datasheet: Circuit Breaker Model XYZ-2000',
    description: 'Technical specifications and performance data for the XYZ-2000 series circuit breaker.',
    type: 'datasheet',
    icon: Settings,
    downloadUrl: '/downloads/datasheet-xyz-2000.pdf',
    category: 'Components',
    publishedDate: '2024-01-05',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAihint: 'circuit breaker',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test1',
    clientName: 'Baraka Ltd',
    company: 'Baraka Manufacturing Ltd.',
    testimonial: 'CircuitFlow\'s panel design training significantly improved our team\'s skills. We\'ve seen a 20% reduction in design errors and faster project turnaround. Highly recommended!',
    projectTitle: 'Team Skill Enhancement Program',
    clientImageUrl: 'https://placehold.co/80x80.png',
    dataAihint: 'company logo',
    imageUrl: 'https://placehold.co/600x400.png', // project image
    dataAihintSecondary: 'factory machinery',
  },
  {
    id: 'test2',
    clientName: 'Amina Khalid',
    company: 'GreenTech Solutions',
    testimonial: 'The consultation services provided by CircuitFlow were invaluable for our new solar installation project. Their expertise helped us optimize the design for maximum efficiency and cost savings.',
    projectTitle: 'Solar Farm Design Consultation',
    clientImageUrl: 'https://placehold.co/80x80.png',
    dataAihint: 'person portrait',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAihintSecondary: 'solar farm',
  },
  {
    id: 'test3',
    clientName: 'David Otieno',
    company: 'OtiConnect Electricals',
    testimonial: 'As a small business owner, the resources CircuitFlow provides are gold. The downloadable guides on panel building have been a fantastic reference for my team.',
    clientImageUrl: 'https://placehold.co/80x80.png',
    dataAihint: 'person smiling',
  },
];

export const navIcons = {
  Home,
  GraduationCap,
  BookOpen,
  MessageCircle,
  Users,
  CalendarDays,
  Zap,
  CircuitBoard,
  DraftingCompass,
  Lightbulb,
  SlidersHorizontal
};
