'use server';

import { z } from 'zod';
import { trainingRecommendation, type TrainingRecommendationInput } from '@/ai/flows/training-recommendation';

// AI Recommendation Action
export async function getTrainingRecommendationAction(input: TrainingRecommendationInput) {
  try {
    // Basic validation, can be expanded with Zod if TrainingRecommendationInput is a Zod schema
    if (!input.designNeeds || typeof input.designNeeds !== 'string' || input.designNeeds.trim() === '') {
      return { success: false, error: "Design needs cannot be empty." };
    }
    const result = await trainingRecommendation(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getTrainingRecommendationAction:", error);
    // It's good practice to not expose raw error messages to the client
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: `Failed to get recommendation. ${errorMessage}` };
  }
}

// Consultation Form Action
const ConsultationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number seems too short." }).optional().or(z.literal('')),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ConsultationFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitConsultationForm(
  prevState: ConsultationFormState,
  data: FormData
): Promise<ConsultationFormState> {
  const formData = Object.fromEntries(data);
  const parsed = ConsultationFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  try {
    // Simulate API call or database save
    console.log("Consultation Form Data:", parsed.data);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    // In a real app, you'd save this to a database or send an email.
    // e.g., await saveConsultationRequest(parsed.data);

    return { message: "Consultation request submitted successfully! We will get back to you soon.", success: true };
  } catch (error) {
    console.error("Error submitting consultation form:", error);
    return { message: "Failed to submit consultation request. Please try again later.", success: false };
  }
}


// Scheduling Form Action
const SchedulingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service." }),
  preferredDate: z.string().min(1, { message: "Please select a date." }),
  preferredTime: z.string().min(1, { message: "Please select a time." }),
  notes: z.string().optional(),
});

export type SchedulingFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitSchedulingForm(
  prevState: SchedulingFormState,
  data: FormData
): Promise<SchedulingFormState> {
  const formData = Object.fromEntries(data);
  const parsed = SchedulingFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }
  
  try {
    // Simulate API call or database save
    console.log("Scheduling Form Data:", parsed.data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, you would save this to a database, check availability, etc.
    // e.g., await createBookingRequest(parsed.data);

    return { message: "Booking request submitted successfully! We will confirm your session soon.", success: true };
  } catch (error) {
    console.error("Error submitting scheduling form:", error);
    return { message: "Failed to submit booking request. Please try again later.", success: false };
  }
}
