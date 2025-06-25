
import { SchedulePageClient } from '@/components/schedule/schedule-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule a Session - Dropbox Draughtsman',
  description: 'Book your training session or project guidance with Dropbox Draughtsman. Use our scheduling system to find a convenient time.',
};

export default function SchedulePage() {
  // This page remains a Server Component and delegates rendering to the client component
  return <SchedulePageClient />;
}
