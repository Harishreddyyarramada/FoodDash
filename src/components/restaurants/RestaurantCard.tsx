import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Restaurant } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={restaurant.imageUrl}
              alt={`Photo of ${restaurant.name}`}
              data-ai-hint={restaurant.imageHint}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-xl mb-1">{restaurant.name}</CardTitle>
          <CardDescription>{restaurant.cuisine}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-4 w-4 text-primary" fill="currentColor" />
            <span className="font-bold">{restaurant.rating.toFixed(1)}</span>
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
