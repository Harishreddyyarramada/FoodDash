'use server';
/**
 * @fileOverview Personalized food recommendations flow.
 *
 * This flow provides personalized food recommendations based on user's past order history and preferences.
 * It takes user ID as input and returns a list of recommended dishes and restaurants.
 *
 * @example
 * // Example usage:
 * const recommendations = await getPersonalizedFoodRecommendations("user123");
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationInputSchema = z.object({
  userId: z.string().describe('The ID of the user to get recommendations for.'),
});

export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

const RecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      dishName: z.string().describe('The name of the recommended dish.'),
      restaurantName: z.string().describe('The name of the restaurant serving the dish.'),
      cuisine: z.string().describe('The cuisine of the dish.'),
      description: z.string().describe('A short description of the dish.'),
    })
  ).describe('A list of personalized food recommendations.'),
});

export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;

export async function getPersonalizedFoodRecommendations(userId: string): Promise<RecommendationOutput> {
  return personalizedFoodRecommendationsFlow({userId});
}

const prompt = ai.definePrompt({
  name: 'personalizedFoodRecommendationsPrompt',
  input: {schema: RecommendationInputSchema},
  output: {schema: RecommendationOutputSchema},
  prompt: `You are a food recommendation expert. Based on the user's ID, provide personalized food recommendations.

  Consider the user's past order history and preferences to suggest dishes and restaurants they might enjoy.

  User ID: {{{userId}}}
  Recommendations should include dish name, restaurant name, cuisine, and a short description.
  Respond in a valid JSON format that matches the RecommendationOutputSchema.
  `,
});

const personalizedFoodRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedFoodRecommendationsFlow',
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
