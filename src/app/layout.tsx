
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/auth-context';

export const metadata: Metadata = {
  title: 'Dropbox Draughtsman - Electrical Design Training & Consultation',
  description: 'Expert electrical design training, consultation, and resources in Kenya by Dropbox Draughtsman.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dropboxdraughtsman.vercel.app';
  const logoUrl = `${siteUrl}/imageL.png`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dropbox Draughtsman",
    "url": siteUrl,
    "logo": logoUrl,
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#7DF9FF" />
        <meta name="google-site-verification" content="nWyaLpqcFzLPe_B2NYecJZoOQXQii5n6-sNCkgfp_T0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body bg-background text-foreground flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
