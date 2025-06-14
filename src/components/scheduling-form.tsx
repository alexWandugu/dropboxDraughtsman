
'use client';

import React, { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle, AlertCircle, Send } from "lucide-react";
import { submitSchedulingForm, type SchedulingFormState } from '@/app/actions';
import { trainingPrograms } from '@/data/mock-data'; // For service options
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const initialState: SchedulingFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Request Booking
    </Button>
  );
}

export function SchedulingForm() {
  const [state, formAction] = useActionState(submitSchedulingForm, initialState);
  const [date, setDate] = React.useState<Date | undefined>();
  const formRef = React.useRef<HTMLFormElement>(null);

  const serviceOptions = [
    { value: "consultation", label: "General Consultation" },
    ...trainingPrograms.map(p => ({ value: p.slug, label: p.title })),
  ];

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setDate(undefined);
    }
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-6 max-w-lg mx-auto" ref={formRef}>
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="Your Name" required className="bg-background/70"/>
        {state.issues?.find(issue => issue.includes('Name')) && <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes('Name'))}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required className="bg-background/70"/>
        {state.issues?.find(issue => issue.includes('email')) && <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes('email'))}</p>}
      </div>
      <div>
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+254 7XX XXX XXX" className="bg-background/70"/>
      </div>
      <div>
        <Label htmlFor="service">Service of Interest</Label>
        <Select name="service" required>
          <SelectTrigger className="w-full bg-background/70">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.issues?.find(issue => issue.includes('service')) && <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes('service'))}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-background/70",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
              />
            </PopoverContent>
          </Popover>
          <Input type="hidden" name="preferredDate" value={date ? format(date, "yyyy-MM-dd") : ""} />
          {state.issues?.find(issue => issue.includes('date')) && <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes('date'))}</p>}
        </div>
        <div>
          <Label htmlFor="preferredTime">Preferred Time</Label>
          <Select name="preferredTime" required>
            <SelectTrigger className="w-full bg-background/70">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00-11:00">09:00 AM - 11:00 AM</SelectItem>
              <SelectItem value="11:00-13:00">11:00 AM - 01:00 PM</SelectItem>
              <SelectItem value="14:00-16:00">02:00 PM - 04:00 PM</SelectItem>
              <SelectItem value="16:00-18:00">04:00 PM - 06:00 PM</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.find(issue => issue.includes('time')) && <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes('time'))}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea id="notes" name="notes" placeholder="Any specific requirements or questions?" rows={3} className="bg-background/70"/>
      </div>
      <SubmitButton />
      {state.message && (
        <Alert variant={state.success ? "default" : "destructive"} className={state.success ? "border-green-500/50 bg-green-500/10" : ""}>
           {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{state.success ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
