
'use client';

import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { submitConsultationForm, type ConsultationFormState } from '@/app/actions';
import React, { useEffect, useActionState } from 'react';

const initialState: ConsultationFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Request
    </Button>
  );
}

export function ConsultationForm() {
  const [state, formAction] = useActionState(submitConsultationForm, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);


  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Request a Consultation</CardTitle>
        <CardDescription>Fill out the form below, and our team will contact you shortly.</CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required className="bg-background/70"/>
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
             {state.issues?.find(issue => issue.includes('Phone')) && <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes('Phone'))}</p>}
          </div>
          <div>
            <Label htmlFor="company">Company (Optional)</Label>
            <Input id="company" name="company" placeholder="Your Company Ltd." className="bg-background/70"/>
          </div>
          <div>
            <Label htmlFor="message">Your Inquiry</Label>
            <Textarea id="message" name="message" placeholder="Describe your consultation needs..." rows={5} required className="bg-background/70"/>
            {state.issues?.find(issue => issue.includes('Message')) && <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.includes('Message'))}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton />
          {state.message && (
            <Alert variant={state.success ? "default" : "destructive"} className={state.success ? "border-green-500/50 bg-green-500/10" : ""}>
              {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{state.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
