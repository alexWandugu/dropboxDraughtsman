import { cn } from "@/lib/utils";
import type React from "react";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtitle?: string;
}

export function SectionTitle({ children, className, as: Element = 'h2', subtitle, ...props }: SectionTitleProps) {
  return (
    <div className="mb-8 md:mb-12 text-center">
      <Element className={cn("text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-primary", className)} {...props}>
        {children}
      </Element>
      {subtitle && <p className="mt-2 text-lg md:text-xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
