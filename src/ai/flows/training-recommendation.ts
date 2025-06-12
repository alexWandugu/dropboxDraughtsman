'use server';

/**
 * @fileOverview Recommends training programs or resources based on user-provided electrical design needs.
 *
 * - trainingRecommendation - A function that handles the training recommendation process.
 * - TrainingRecommendationInput - The input type for the trainingRecommendation function.
 * - TrainingRecommendationOutput - The return type for the trainingRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrainingRecommendationInputSchema = z.object({
  designNeeds: z
    .string()
    .describe('Specific electrical design needs of the user.'),
});
export type TrainingRecommendationInput = z.infer<typeof TrainingRecommendationInputSchema>;

const TrainingRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('Recommended training programs or resources.'),
});
export type TrainingRecommendationOutput = z.infer<typeof TrainingRecommendationOutputSchema>;

export async function trainingRecommendation(input: TrainingRecommendationInput): Promise<TrainingRecommendationOutput> {
  return trainingRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trainingRecommendationPrompt',
  input: {schema: TrainingRecommendationInputSchema},
  output: {schema: TrainingRecommendationOutputSchema},
  prompt: `You are an expert in electrical design training programs and resources.

  Based on the user's design needs, provide relevant training program or resource recommendations.

  Design Needs: {{{designNeeds}}}`,
});

const trainingRecommendationFlow = ai.defineFlow(
  {
    name: 'trainingRecommendationFlow',
    inputSchema: TrainingRecommendationInputSchema,
    outputSchema: TrainingRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
