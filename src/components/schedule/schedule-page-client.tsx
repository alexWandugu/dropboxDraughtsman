
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context'; 

import { SchedulingForm } from '@/components/scheduling-form';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2 } from 'lucide-react';

export function SchedulePageClient() {
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login'); 
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !isAuthenticated) {
    // Show loading spinner while auth state is being determined or if not authenticated yet (before redirect)
    return (
      <SectionContainer className="flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Verifying your access...</p>
      </SectionContainer>
    );
  }

  // User is authenticated, render the page content
  return (
    <SectionContainer>
      <SectionTitle subtitle="Book Your Training or Consultation Slot with Ease">
        Schedule Your Session
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="md:order-2">
          <h3 className="text-2xl font-headline font-semibold mb-4 text-primary">Book an Appointment</h3>
          <p className="text-muted-foreground mb-6">
            Select your desired service, preferred date, and time. Our team will confirm your booking as soon as possible.
            Welcome, {user?.email}!
          </p>
          <SchedulingForm />
        </div>
        <div className="md:order-1 space-y-6">
           <h3 className="text-2xl font-headline font-semibold mb-4 text-primary">Our Availability</h3>
           <Alert className="bg-primary/10 border-primary/30">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary">Check Our Calendar</AlertTitle>
            <AlertDescription>
              The calendar below shows general availability. Specific slots are subject to confirmation. Please use the form to request your preferred time.
            </AlertDescription>
          </Alert>
          <div className="p-4 border rounded-lg bg-card shadow-md flex justify-center">
            <ShadCalendar
              mode="single"
              selected={new Date()} 
              className="rounded-md "
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } 
            />
          </div>
           <p className="text-sm text-muted-foreground text-center">
            Our standard operating hours are Monday to Friday, 9 AM - 5 PM. Weekend sessions by special arrangement.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
