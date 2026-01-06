'use client';

import { useEffect, useState } from 'react';
import { getRecommendedItems, getRestaurantById } from '@/lib/data';
import type { MenuItem, Restaurant } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/components/cart/CartContext';
import { useToast } from "@/hooks/use-toast"
import { RestaurantCard } from '../restaurants/RestaurantCard';

interface RecommendationItem {
  dish: MenuItem;
  restaurant: Restaurant | undefined;
}

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For now, we simulate it with local data
        const recommendedDishes = getRecommendedItems();
        const recommendationDetails: RecommendationItem[] = recommendedDishes.map(dish => ({
          dish,
          restaurant: getRestaurantById(dish.restaurantId)
        }));
        
        // Let's also get some restaurants for this section
        const restaurantData = [getRestaurantById('1'), getRestaurantById('2'), getRestaurantById('3'), getRestaurantById('4')].filter(Boolean) as Restaurant[];

        setRecommendations(recommendationDetails);
        setRestaurants(restaurantData);
        
      } catch (e) {
        setError('Could not fetch recommendations at this time.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  };

  if (loading) {
    return (
        <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent>
            {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Skeleton className="h-80 w-full rounded-2xl" />
                  </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
      </Carousel>
    );
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  if (restaurants.length === 0) {
    return <p className="text-muted-foreground">No recommendations available for you right now.</p>;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {restaurants.map((restaurant) => (
            <CarouselItem key={restaurant.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <RestaurantCard restaurant={restaurant} />
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious className="ml-12"/>
      <CarouselNext className="mr-12"/>
    </Carousel>
  );
}
