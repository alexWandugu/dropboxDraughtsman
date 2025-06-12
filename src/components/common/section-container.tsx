import { cn } from "@/lib/utils";
import type React from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements; // Allows specifying HTML tag, defaults to section
}

export function SectionContainer({ children, className, as: Element = 'section', ...props }: SectionContainerProps) {
  return (
    <Element className={cn("py-12 md:py-16 lg:py-20", className)} {...props}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </Element>
  );
}
