'use server';

/**
 * @fileOverview An AI-powered restaurant recommendation system based on textual descriptions.
 *
 * - findRestaurantRecommendations - A function that takes a textual food description and returns restaurant recommendations.
 * - FindRestaurantRecommendationsInput - The input type for the findRestaurantRecommendations function.
 * - FindRestaurantRecommendationsOutput - The return type for the findRestaurantRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindRestaurantRecommendationsInputSchema = z.object({
  foodDescription: z
    .string()
    .describe('A textual description of the desired food or cuisine.'),
});
export type FindRestaurantRecommendationsInput = z.infer<
  typeof FindRestaurantRecommendationsInputSchema
>;

const FindRestaurantRecommendationsOutputSchema = z.object({
  restaurantRecommendations: z
    .array(z.string())
    .describe('A list of restaurant recommendations based on the food description.'),
});
export type FindRestaurantRecommendationsOutput = z.infer<
  typeof FindRestaurantRecommendationsOutputSchema
>;

export async function findRestaurantRecommendations(
  input: FindRestaurantRecommendationsInput
): Promise<FindRestaurantRecommendationsOutput> {
  return findRestaurantRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findRestaurantRecommendationsPrompt',
  input: {schema: FindRestaurantRecommendationsInputSchema},
  output: {schema: FindRestaurantRecommendationsOutputSchema},
  prompt: `You are a restaurant recommendation expert. Given the following food description, recommend a list of restaurants that match the description.

Food Description: {{{foodDescription}}}

Restaurant Recommendations:`, // Consider using a more complex prompt with examples
});

const findRestaurantRecommendationsFlow = ai.defineFlow(
  {
    name: 'findRestaurantRecommendationsFlow',
    inputSchema: FindRestaurantRecommendationsInputSchema,
    outputSchema: FindRestaurantRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
