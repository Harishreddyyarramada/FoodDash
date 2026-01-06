'use server';
/**
 * @fileOverview A menu item search flow.
 *
 * This flow provides menu item search functionality.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { menuItems } from '@/lib/data';
import type { MenuItem } from '@/lib/types';

const SearchInputSchema = z.object({
  query: z.string().describe('The search query for food items.'),
});

export type SearchInput = z.infer<typeof SearchInputSchema>;

const MenuItemSchema = z.object({
    id: z.string(),
    restaurantId: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    imageHint: z.string(),
    category: z.string(),
});

const SearchOutputSchema = z.object({
  menuItems: z.array(MenuItemSchema).describe('A list of menu items that match the search query.'),
});

export type SearchOutput = z.infer<typeof SearchOutputSchema>;

// Simple text search for now. Can be replaced with a more advanced search later.
function performSearch(query: string): MenuItem[] {
    const lowercasedQuery = query.toLowerCase();
    return menuItems.filter(item => 
        item.name.toLowerCase().includes(lowercasedQuery) ||
        item.description.toLowerCase().includes(lowercasedQuery) ||
        item.category.toLowerCase().includes(lowercasedQuery)
    );
}

export async function searchMenuItems(input: SearchInput): Promise<SearchOutput> {
  return searchMenuItemsFlow(input);
}

const searchMenuItemsFlow = ai.defineFlow(
  {
    name: 'searchMenuItemsFlow',
    inputSchema: SearchInputSchema,
    outputSchema: SearchOutputSchema,
  },
  async (input) => {
    const results = performSearch(input.query);
    return { menuItems: results };
  }
);
