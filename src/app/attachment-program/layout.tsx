
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Attachment Program - Dropbox Draughtsman',
  description: 'Gain hands-on experience in electrical panel design, manufacturing, and testing with our comprehensive industrial attachment program.',
  alternates: {
    canonical: '/attachment-program',
  },
};

export default function AttachmentProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
