
import type { TrainingProgram, Instructor, Resource, Testimonial, ShowcaseActivity } from '@/types';
import { Zap, CircuitBoard, Lightbulb, FileText, Download, Video, Star, Users, GraduationCap, BookOpen, MessageCircle, CalendarDays, DraftingCompass, Settings, SlidersHorizontal, Home, Annoyed } from 'lucide-react';

export const instructors: Instructor[] = [
  { id: 'inst1', name: 'Eng. Jane Doe', bio: 'Lead Electrical Engineer with 15+ years of experience in industrial automation and panel design. Certified trainer for Siemens and Schneider Electric systems.', imageUrl: 'https://placehold.co/100x100.png', dataAihint: 'engineer portrait', specialization: 'Industrial Automation' ,},
  { id: 'inst2', name: 'Dr. John Smith', bio: 'PhD in Electrical Engineering, specializing in renewable energy systems and power distribution. Published author and conference speaker.', imageUrl: 'https://placehold.co/100x100.png', dataAihint: 'academic portrait', specialization: 'Renewable Energy',},
  { id: 'inst3', name: 'Alice Wanjiru', bio: 'Expert in CAD software for electrical design (AutoCAD Electrical, EPLAN). 10 years of experience in creating detailed schematics and layouts.', imageUrl: 'https://placehold.co/100x100.png', dataAihint: 'designer portrait', specialization: 'CAD Design', },
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
    slug: 'E-CAD-essentials',
    title: 'E-CAD Essentials',
    shortDescription: 'Learn to create professional electrical drawings and schematics using EPlan.',
    detailedDescription: 'Master the essential tools and techniques of Eplan Electric P8. This course will guide you through creating schematic diagrams, panel layouts, and generating reports. Perfect for drafters and designers.',
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
    slug: 'power-control-system-design',
    title: 'Power and Control systems Design',
    shortDescription: 'In-depth course on designing, sizing, and installing LV power systems.',
    detailedDescription: 'Gain expertise in power systems technology, from site assessment and system sizing to installation best practices, including troubleshooting and commissioning.',
    schedule: 'Flexible Online Modules + 1 Week Practical',
    duration: '8 Weeks (Online) + 1 Week (Practical)',
    price: 'KES 65,000',
    instructors: [instructors[1]],
    icon: Zap,
    image: 'https://placehold.co/600x400.png',
    dataAihint: 'power systems',
    learnings: ['Power and Control system components', 'Site assessment', 'System sizing and design', 'Installation, commissioning & Troublesh0oting']
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
    content: 'This document provides a comprehensive walkthrough of the IEC 61439 standards for low-voltage switchgear and controlgear assemblies. Download the full PDF for detailed diagrams, checklists, and compliance requirements.',
    category: 'Standards',
    publishedDate: '2023-10-15',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAihint: 'switchgear controlgear',
  },
  {
    id: 'res2',
    slug: 'article-panel-building-tips',
    title: 'Top 10 Tips for Efficient Panel Building',
    description: 'An article sharing practical tips for improving efficiency and quality in electrical panel building.',
    type: 'article',
    icon: Lightbulb,
    content: `Building electrical panels requires precision, safety, and efficiency. Whether you are a seasoned professional or just starting, these top 10 tips will help you streamline your workflow, improve the quality of your builds, and ensure safety standards are met.

### 1. Plan Your Layout Meticulously
Before you even touch a wire, have a clear layout plan. Use software like AutoCAD Electrical or EPLAN to design your panel layout. This helps in visualizing component placement, wire routing, and ensuring adequate space for cooling and future modifications. A good plan minimizes errors and rework.

### 2. Use Quality Components
Never compromise on the quality of components. Using reputable brands for circuit breakers, contactors, relays, and power supplies ensures reliability and longevity of the panel. It might cost more upfront, but it saves on maintenance and potential failures down the line.

### 3. Label Everything
Clear and consistent labeling is a lifesaver during troubleshooting and maintenance. Label every wire, terminal block, and component according to your schematic. Use durable, professional-grade labels that won't fade or peel off over time.

### 4. Manage Your Wires
Proper wire management is not just for aesthetics; it's crucial for safety and functionality. Use wire ducts, trunking, and cable ties to neatly route your wires. This prevents wires from getting pinched, improves airflow, and makes it easier to trace circuits.

### 5. Follow Color Coding Standards
Adhere to industry-standard color codes for wiring (e.g., IEC 60204). This makes your panel understandable to other professionals and significantly speeds up installation and troubleshooting. For example, use black for AC power, red for AC control, blue for DC control, and green/yellow for earth.

### 6. Correct Tooling is Key
Invest in high-quality tools. Proper wire strippers, crimpers, and screwdrivers with insulated handles are essential. Using the right tool for the job prevents damage to components and wires and ensures secure connections.

### 7. Torque All Connections
Loose connections are a common cause of failure and can be a fire hazard. Use a torque screwdriver or wrench to tighten all terminal connections to the manufacturer's specified torque values.

### 8. Test as You Go
Don't wait until the end to test your panel. Perform continuity tests and point-to-point checks as you complete sections of the wiring. This helps in catching errors early when they are easier to fix.

### 9. Ensure Proper Grounding
Proper grounding (earthing) is non-negotiable for safety. Ensure you have a single, solid grounding point and that all metallic components of the panel are properly bonded to it.

### 10. Keep Documentation
Always keep your final schematics, layout drawings, and a bill of materials with the panel. This documentation is invaluable for future maintenance, upgrades, or troubleshooting.

By following these tips, you can build electrical panels that are not only functional and reliable but also safe and easy to maintain.`,
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
    downloadUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: 'This video tutorial provides a step-by-step guide to setting up a basic Variable Frequency Drive (VFD) for motor control. Follow along to understand the key parameters and configuration steps. Click the link to watch the full video on YouTube.',
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
    content: 'Access the complete technical datasheet for the Circuit Breaker Model XYZ-2000. The document includes detailed specifications, performance curves, dimensional drawings, and application notes.',
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
    testimonial: 'Dropbox Draughtsman\'s panel design training significantly improved our team\'s skills. We\'ve seen a 20% reduction in design errors and faster project turnaround. Highly recommended!',
    projectTitle: 'Team Skill Enhancement Program',
    clientImageUrl: 'https://placehold.co/80x80.png',
    dataAihint: 'company logo',
    imageUrl: 'https://placehold.co/600x400.png', 
    dataAihintSecondary: 'factory machinery',
  },
  {
    id: 'test2',
    clientName: 'Amina Khalid',
    company: 'GreenTech Solutions',
    testimonial: 'The expert guidance provided by Dropbox Draughtsman was invaluable for our new solar installation project. Their expertise helped us optimize the design for maximum efficiency and cost savings.',
    projectTitle: 'Solar Farm Design Guidance',
    clientImageUrl: 'https://placehold.co/80x80.png',
    dataAihint: 'person portrait',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAihintSecondary: 'solar farm',
  },
  {
    id: 'test3',
    clientName: 'David Otieno',
    company: 'OtiConnect Electricals',
    testimonial: 'As a small business owner, the resources Dropbox Draughtsman provides are gold. The downloadable guides on panel building have been a fantastic reference for my team.',
    clientImageUrl: 'https://placehold.co/80x80.png',
    dataAihint: 'person smiling',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAihintSecondary: 'electrical workshop',
  },
];

export const showcaseActivities: ShowcaseActivity[] = [
  {
    id: 'sa1',
    title: 'Advanced Panel Design Workshop',
    description: 'Our latest workshop focusing on IEC 61439 compliance and modern panel building techniques.',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAihint: 'workshop training',
    category: 'Ongoing Program',
    link: '/training#panel-design-masterclass',
  },
  {
    id: 'sa2',
    title: 'E-CAD Essentials Course Launch',
    description: 'Now enrolling for our popular E-CAD course using EPlan. Limited seats available!',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAihint: 'computer software',
    category: 'New Course',
    link: '/training#E-CAD-essentials',
  },
  {
    id: 'sa3',
    title: 'Kenya Power Systems Seminar Highlights',
    description: 'Successful seminar on power system design and installation best practices. Thanks to all attendees!',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAihint: 'seminar presentation',
    category: 'Recent Event',
  },
  {
    id: 'sa4',
    title: 'Free Guidance Week',
    description: 'Book a free 30-minute guidance session with our experts this month. Limited slots!',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAihint: 'team meeting',
    category: 'Special Offer',
    link: '/guidance',
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
  SlidersHorizontal,
  Annoyed,
};
