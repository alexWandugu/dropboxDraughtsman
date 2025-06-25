
'use server';

import { z } from 'zod';
import { trainingRecommendation, type TrainingRecommendationInput } from '@/ai/flows/training-recommendation';
import { firestore, collection, addDoc, serverTimestamp } from '@/lib/firebase';
import { sendEmail } from '@/lib/email';

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

// Guidance Form Action
const GuidanceFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number seems too short." }).optional().or(z.literal('')),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type GuidanceFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitGuidanceForm(
  prevState: GuidanceFormState,
  data: FormData
): Promise<GuidanceFormState> {
  const formData = Object.fromEntries(data);
  const parsed = GuidanceFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  try {
    const guidanceCollection = collection(firestore, "guidanceRequests");
    await addDoc(guidanceCollection, {
      ...parsed.data,
      createdAt: serverTimestamp(),
      status: 'new',
    });

    // Send email notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@example.com', // Fallback for safety
      subject: 'New Project Guidance Request',
      html: `
        <h1>New Project Guidance Request</h1>
        <p>A new request has been submitted through the website.</p>
        <h2>Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${parsed.data.name}</li>
          <li><strong>Email:</strong> ${parsed.data.email}</li>
          ${parsed.data.phone ? `<li><strong>Phone:</strong> ${parsed.data.phone}</li>` : ''}
          ${parsed.data.company ? `<li><strong>Company:</strong> ${parsed.data.company}</li>` : ''}
        </ul>
        <h3>Message:</h3>
        <p>${parsed.data.message}</p>
      `,
    });

    return { message: "Your request has been submitted successfully! We will get back to you soon.", success: true };
  } catch (error) {
    console.error("Error submitting guidance form:", error);
    return { message: "Failed to submit your request. Please try again later.", success: false };
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
    const bookingsCollection = collection(firestore, "bookings");
    await addDoc(bookingsCollection, {
        ...parsed.data,
        createdAt: serverTimestamp(),
        status: 'pending',
    });

    // Send email notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: 'New Booking Request',
      html: `
        <h1>New Booking Request</h1>
        <p>A new booking request has been submitted for scheduling.</p>
        <h2>Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${parsed.data.name}</li>
          <li><strong>Email:</strong> ${parsed.data.email}</li>
          ${parsed.data.phone ? `<li><strong>Phone:</strong> ${parsed.data.phone}</li>` : ''}
          <li><strong>Service:</strong> ${parsed.data.service}</li>
          <li><strong>Preferred Date:</strong> ${parsed.data.preferredDate}</li>
          <li><strong>Preferred Time:</strong> ${parsed.data.preferredTime}</li>
        </ul>
        <h3>Notes:</h3>
        <p>${parsed.data.notes || 'N/A'}</p>
      `
    });

    return { message: "Booking request submitted successfully! We will confirm your session soon.", success: true };
  } catch (error) {
    console.error("Error submitting scheduling form:", error);
    return { message: "Failed to submit booking request. Please try again later.", success: false };
  }
}
