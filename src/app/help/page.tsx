
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Code, BookUser } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <BookUser className="h-10 w-10 text-primary" />
                    <div>
                        <h1 className="text-4xl font-headline font-bold">Help Center</h1>
                        <p className="text-muted-foreground">Find answers to common questions about managing your restaurant.</p>
                    </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">How do I add a new menu item?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>To add a new menu item to your restaurant, you need to add a new entry to the `menuItems` array in the `src/lib/data.ts` file. Each menu item is an object with the following structure:</p>
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                                <code className="font-code text-sm">
{`{
  id: 'm37', // Must be unique
  restaurantId: '1', // The ID of your restaurant
  name: 'New Awesome Dish',
  description: 'A delicious description of your new dish.',
  price: 19.99,
  imageUrl: "https://picsum.photos/seed/newdish/600/400",
  imageHint: 'new dish',
  category: 'Appetizers', // e.g., 'Pizza', 'Burgers', 'Salads'
  isVegetarian: true, // true if vegetarian, false otherwise
  tags: ['Best Seller'] // Optional: e.g., ['Best Seller', 'Highly Rated']
}`}
                                </code>
                            </pre>
                            <p>Make sure to provide a unique `id`, associate it with the correct `restaurantId`, and fill out all the details accurately. The `category` will be used to group items on your restaurant page.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg font-semibold">How do I edit or remove a menu item?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>To edit a menu item, locate it in the `menuItems` array in `src/lib/data.ts` by its `id` and modify its properties. To remove an item, simply delete its corresponding object from the array.</p>
                            <p>After making changes, the application will automatically reflect the updated menu.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-lg font-semibold">How do menu categories work?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>Menu categories are determined by the `category` field you set for each `MenuItem`. The restaurant page will automatically create a list of unique categories based on what you've assigned to your items.</p>
                            <p>When a user clicks on a category, the page will display only the items belonging to that category. Ensure your category names are consistent (e.g., always use "Salads", not "salad" or "Salad") for best results.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
