'use client';

import { RestaurantList } from '@/components/restaurants/RestaurantList';
import { Recommendations } from '@/components/recommendations/Recommendations';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-orange-500">
          FoodDash
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Discover the best food & drinks in your area
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Input
            placeholder="Search for restaurants and dishes..."
            className="pl-10 h-12 text-base"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-semibold mb-6">
          Recommended for you
        </h2>
        <Recommendations />
      </section>

      <section>
         <h2 className="text-3xl font-headline font-semibold mb-6">
          All Restaurants
        </h2>
        <RestaurantList />
      </section>
    </div>
  );
}
