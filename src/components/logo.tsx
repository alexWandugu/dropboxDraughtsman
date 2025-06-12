import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors ${className}`}>
      <Zap className="h-7 w-7" />
      CircuitFlow
    </Link>
  );
}
