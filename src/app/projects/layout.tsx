
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects - Dropbox Draughtsman',
  description: 'Explore a catalogue of our completed electrical design projects, workshops, and events. See our expertise in action.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
