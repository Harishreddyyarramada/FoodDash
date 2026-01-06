'use client';

import { RestaurantList } from '@/components/restaurants/RestaurantList';
import { Recommendations } from '@/components/recommendations/Recommendations';
import { Input } from '@/components/ui/input';
import { Search, Frown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useTransition, useCallback } from 'react';
import { FoodOptions } from '@/components/home/FoodOptions';
import { searchMenuItems } from '@/ai/flows/search';
import type { MenuItem } from '@/lib/types';
import { MenuItemCard } from '@/components/restaurants/MenuItemCard';
import { Skeleton } from '@/components/ui/skeleton';
import { WelcomeBanner } from '@/components/home/WelcomeBanner';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const performSearch = useCallback((query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    startTransition(() => {
      searchMenuItems({ query }).then(response => {
        setSearchResults(response.menuItems);
        setIsSearching(false);
      });
    });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // Debounce search calls

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, performSearch]);

  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">
          FoodDash
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Discover the best food & drinks in your area
        </p>
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <Input
            id="main-search-bar"
            placeholder="Search for restaurants and dishes..."
            className="pl-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </form>
      </section>

      {showSearchResults ? (
        <section>
          <h2 className="text-3xl font-headline font-semibold mb-6">
            Search Results
          </h2>
          {isSearching ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-[150px] w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((item) => (
                <MenuItemCard key={item.id} menuItem={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Frown className="mx-auto h-24 w-24 text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-semibold">No results found</h2>
              <p className="mt-2 text-muted-foreground">We couldn't find any dishes matching your search.</p>
            </div>
          )}
        </section>
      ) : (
        <>
          <WelcomeBanner />

          <section className="mb-12">
            <FoodOptions />
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
        </>
      )}
    </div>
  );
}
