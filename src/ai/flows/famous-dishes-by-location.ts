'use server';
/**
 * @fileOverview A flow to find famous dishes based on user's location.
 *
 * This flow takes latitude and longitude as input and returns a list of
 * famous dishes available in that area, including dish name, restaurant, and a description.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FamousDishesInputSchema = z.object({
  latitude: z.number().describe("The latitude of the user's location."),
  longitude: z.number().describe("The longitude of the user's location."),
});

export type FamousDishesInput = z.infer<typeof FamousDishesInputSchema>;

const FamousDishesOutputSchema = z.object({
  areaName: z.string().describe("The name of the city or general area for the given coordinates."),
  dishes: z.array(
    z.object({
      dishName: z.string().describe('The name of the famous dish.'),
      restaurantName: z.string().describe('The name of the restaurant serving the dish.'),
      description: z.string().describe("A short, enticing description of the dish and why it's famous."),
    })
  ).describe('A list of famous dishes found near the specified location.'),
});

export type FamousDishesOutput = z.infer<typeof FamousDishesOutputSchema>;

export async function findFamousDishesByLocation(
  input: FamousDishesInput
): Promise<FamousDishesOutput> {
  return findFamousDishesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findFamousDishesPrompt',
  input: { schema: FamousDishesInputSchema },
  output: { schema: FamousDishesOutputSchema },
  prompt: `You are a local food expert. Based on the user's location (latitude: {{{latitude}}}, longitude: {{{longitude}}}), first identify the general city or area name for these coordinates.

  Then, identify 3-5 famous or highly recommended dishes from nearby restaurants in that area.

  For each dish, provide its name, the restaurant that serves it, and a brief, compelling description that explains why it's a must-try.

  Respond in a valid JSON format that matches the FamousDishesOutputSchema.
  `,
});

const findFamousDishesFlow = ai.defineFlow(
  {
    name: 'findFamousDishesFlow',
    inputSchema: FamousDishesInputSchema,
    outputSchema: FamousDishesOutputSchema,
  },
  async (input) => {
    // In a real application, you would use the lat/long to query a database
    // of restaurants and their menus before passing data to the LLM.
    // For now, we are passing the location directly to the LLM to generate recommendations.
    const { output } = await prompt(input);
    return output!;
  }
);
