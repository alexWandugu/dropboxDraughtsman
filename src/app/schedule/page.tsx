import { SchedulingForm } from '@/components/scheduling-form';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Calendar as ShadCalendar } from "@/components/ui/calendar"; // Renamed to avoid conflict
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

export const metadata = {
  title: 'Schedule a Session - CircuitFlow',
  description: 'Book your training session or consultation with CircuitFlow. Use our scheduling system to find a convenient time.',
};

export default function SchedulePage() {
  // Note: The ShadCN Calendar here is for display/reference.
  // Actual date selection is handled within SchedulingForm using Popover Calendar.
  // This calendar could show company-wide availability or events in a real app.
  
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
              selected={new Date()} // Show today's date as selected for visual cue
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
