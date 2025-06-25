'use client';

import React, { useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { subscribeToNewsletter, type NewsletterFormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const initialState: NewsletterFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="default" size="icon" aria-label="Subscribe to newsletter" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
    </Button>
  );
}

export function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // We only want to show a toast when a message is returned from the server action.
    // This avoids showing a toast on initial component render.
    if (state.message) {
      toast({
        title: state.success ? "Success" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="flex gap-2">
      <Input name="email" type="email" placeholder="Enter your email" required className="bg-background" />
      <SubmitButton />
    </form>
  );
}
