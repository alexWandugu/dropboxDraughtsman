
'use client';

import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, AlertCircle, CheckCircle } from 'lucide-react';
import { getTrainingRecommendationAction } from '@/app/actions';
import type { TrainingRecommendationOutput } from '@/ai/flows/training-recommendation';

const initialState = {
  data: null as TrainingRecommendationOutput | null,
  error: null as string | null,
  success: false,
};

export function AiRecommendationTool() {
  const [designNeeds, setDesignNeeds] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const [recommendationState, setRecommendationState] = useState(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRecommendationState(initialState); 

    startTransition(async () => {
      try {
        const result = await getTrainingRecommendationAction({ designNeeds });
        if (result.success && result.data) {
          setRecommendationState({ data: result.data, error: null, success: true });
        } else {
          setRecommendationState({ data: null, error: result?.error || "Failed to get recommendation. Please try again.", success: false });
        }
      } catch (e) {
        console.error("Error calling getTrainingRecommendationAction:", e);
        const errorMessage = e instanceof Error ? e.message : "An unexpected server error occurred.";
        setRecommendationState({ data: null, error: `Failed to connect to the AI advisor: ${errorMessage}`, success: false });
      }
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl animate-fade-in">
      <CardHeader className="text-center">
        <Wand2 className="mx-auto h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-2xl font-headline">AI Training Advisor</CardTitle>
        <CardDescription>Describe your electrical design needs, and our AI will suggest relevant training or resources.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Textarea
            id="designNeeds"
            name="designNeeds"
            placeholder="e.g., 'I need to learn about designing control panels for industrial automation' or 'Help me find resources on power system design.'"
            rows={5}
            value={designNeeds}
            onChange={(e) => setDesignNeeds(e.target.value)}
            className="bg-background/70 focus:ring-accent"
            required
            disabled={isPending}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isPending || !designNeeds.trim()}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            Get Recommendation
          </Button>
        </CardFooter>
      </form>

      {isPending && (
        <div className="p-6 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Finding the best recommendations for you...</p>
        </div>
      )}

      {!isPending && recommendationState.error && (
        <div className="p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{recommendationState.error}</AlertDescription>
          </Alert>
        </div>
      )}
      {!isPending && recommendationState.success && recommendationState.data && (
        <div className="p-4">
          <Alert variant="default" className="border-primary/50 bg-primary/10">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Recommendation Found!</AlertTitle>
            <AlertDescription className="text-foreground">
              <p className="whitespace-pre-line">{recommendationState.data.recommendation}</p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
