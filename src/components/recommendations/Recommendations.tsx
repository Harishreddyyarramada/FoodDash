'use client';

import { useEffect, useState } from 'react';
import { getRecommendedItems, getRestaurantById } from '@/lib/data';
import type { MenuItem, Restaurant } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

interface RecommendationItem {
  dish: MenuItem;
  restaurant: Restaurant | undefined;
}

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const recommendedDishes = getRecommendedItems();
        const recommendationDetails: RecommendationItem[] = recommendedDishes.map(dish => ({
          dish,
          restaurant: getRestaurantById(dish.restaurantId)
        }));
        
        setRecommendations(recommendationDetails);
        
      } catch (e) {
        setError('Could not fetch recommendations at this time.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
        <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent>
            {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                    <Card>
                    <Skeleton className="h-40 w-full" />
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                    </Card>
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

  if (recommendations.length === 0) {
    return <p className="text-muted-foreground">No recommendations available for you right now.</p>;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {recommendations.map(({ dish, restaurant }, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1 h-full">
              <Card className="h-full flex flex-col group overflow-hidden">
                <div className="relative h-40 w-full">
                   <Image
                    src={dish.imageUrl}
                    alt={dish.name}
                    data-ai-hint={dish.imageHint}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">{dish.name}</CardTitle>
                  <CardDescription>from {restaurant?.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <Badge variant="secondary">{dish.category}</Badge>
                    <p className="text-sm text-muted-foreground line-clamp-2">{dish.description}</p>
                </CardContent>
                <CardContent className="flex justify-between items-center">
                    <p className="font-bold text-lg">${dish.price.toFixed(2)}</p>
                    <Button size="sm" disabled>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add
                    </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
