import Link from 'next/link';
import { Zap } from 'lucide-react';
import Image from 'next/image';
import CustomLogo from 'src/components/image.svg';
// import {ReactComponent as CustomLogo} from 'src/components/image-svg.svg';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors ${className}`}>
      {/* <Zap className="h-7 w-7" /> */}
      {/* <img src = 'src/components/image-removebg-preview (40)-modified.png'/> */}
      {/* <CustomLogo /> */}
      <Image src="/imageL.png" alt="App Logo" width={50} height={30}/>
      Dropbox Draughtsman
    </Link>
  );
}
