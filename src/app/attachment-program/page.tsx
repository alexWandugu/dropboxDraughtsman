
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, CheckCircle } from 'lucide-react';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

const attachmentImages = [
  {
    src: 'https://placehold.co/800x600.png',
    alt: 'Students designing electrical schematics on a computer',
    hint: 'students designing'
  },
  {
    src: 'https://placehold.co/800x600.png',
    alt: 'Hands-on assembly of an electrical panel',
    hint: 'panel assembly'
  },
  {
    src: 'https://placehold.co/800x600.png',
    alt: 'Wiring components within a control panel',
    hint: 'electrical wiring'
  },
  {
    src: 'https://placehold.co/800x600.png',
    alt: 'Testing a completed electrical panel with diagnostic tools',
    hint: 'electrical testing'
  },
];

const keyLearnings = [
    "E-CAD software proficiency (EPlan/AutoCAD Electrical)",
    "Component selection and sourcing",
    "Panel layout and general arrangement design",
    "Assembly and wiring techniques based on IEC standards",
    "Quality control and inspection protocols",
    "Functional testing and troubleshooting",
    "Professional documentation and reporting"
];

export default function AttachmentProgramPage() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <>
      <SectionContainer>
        <SectionTitle subtitle="From Theory to Practice: A Comprehensive Learning Experience">
          Industrial Attachment Program
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className="text-lg">
              Our Industrial Attachment Program is designed for aspiring electrical engineers and technicians to gain invaluable, hands-on experience. In this program, students learn the full walk-through of an electrical panel from design, manufacture, and testing.
            </p>
            <p>
              You will work alongside our experienced engineers, contributing to real projects and understanding the practical challenges and solutions in the world of electrical design and automation.
            </p>
            <h3 className="text-primary">Who is this for?</h3>
            <p>
              This program is ideal for university and college students pursuing a diploma or degree in Electrical Engineering, Mechatronics, or a related field, who are required to complete an industrial attachment as part of their curriculum.
            </p>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="An intern working on an electrical panel"
              layout="fill"
              objectFit="cover"
              data-ai-hint="student learning"
              priority
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-muted/40">
        <SectionTitle subtitle="What You Will Experience">
          Program Highlights
        </SectionTitle>
        <Carousel
          opts={{ align: "start", loop: true, }}
          plugins={[autoplayPlugin.current]}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {attachmentImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video relative">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={image.hint}
                      />
                    </div>
                    <div className="p-4 bg-card">
                      <p className="font-semibold text-center text-foreground">{image.alt}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle subtitle="Skills You Will Gain">
            Key Learning Areas
        </SectionTitle>
        <div className="max-w-3xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {keyLearnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-lg">{learning}</span>
                </li>
              ))}
            </ul>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-primary/10">
         <div className="text-center">
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">Ready to Apply?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                If you are a passionate and driven student ready to kickstart your career in electrical engineering, we would love to hear from you.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/guidance">
                    Inquire About Attachment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </SectionContainer>
    </>
  );
}
