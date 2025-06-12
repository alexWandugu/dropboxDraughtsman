
import { SchedulePageClient } from '@/components/schedule/schedule-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule a Session - CircuitFlow',
  description: 'Book your training session or consultation with CircuitFlow. Use our scheduling system to find a convenient time.',
};

export default function SchedulePage() {
  // This page remains a Server Component and delegates rendering to the client component
  return <SchedulePageClient />;
}
