import type { NavItem } from '@/types';
import { Home, GraduationCap, BookOpen, MessageCircle, Users, CalendarDays, Zap } from 'lucide-react';

export const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Training Programs', href: '/training', icon: GraduationCap },
  { label: 'Resources', href: '/resources', icon: BookOpen },
  { label: 'Consultation', href: '/consultation', icon: MessageCircle },
  { label: 'Testimonials', href: '/testimonials', icon: Users },
  { label: 'Schedule', href: '/schedule', icon: CalendarDays },
];

export const footerNavItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/consultation' },
];

export const socialLinks = [
  { name: 'Facebook', href: '#', icon: '/icons/facebook.svg' }, // Placeholder, replace with actual icons
  { name: 'Twitter', href: '#', icon: '/icons/twitter.svg' },
  { name: 'LinkedIn', href: '#', icon: '/icons/linkedin.svg' },
];
