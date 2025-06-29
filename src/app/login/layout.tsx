
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In / Register - Dropbox Draughtsman',
  description: 'Access your Dropbox Draughtsman account or create a new one to schedule training, request guidance, and access exclusive resources.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
