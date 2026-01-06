'use client';

import { useEffect, useState } from 'react';
import { getPersonalizedFoodRecommendations, RecommendationOutput } from '@/ai/flows/personalized-food-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationOutput['recommendations']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        // Using a dummy user ID for demonstration
        const result = await getPersonalizedFoodRecommendations('user123');
        if (result && result.recommendations) {
          setRecommendations(result.recommendations);
        } else {
          // Handle case where recommendations might be empty or null
          setRecommendations([]);
        }
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
            {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                    <Card>
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
        {recommendations.map((rec, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline">{rec.dishName}</CardTitle>
                  <CardDescription>from {rec.restaurantName}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <Badge variant="secondary">{rec.cuisine}</Badge>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                </CardContent>
                <CardContent>
                    <Button size="sm" className="w-full" disabled>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Order Now (Coming Soon)
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
