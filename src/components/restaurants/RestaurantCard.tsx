import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock } from 'lucide-react';
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
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={restaurant.imageUrl}
              alt={`Photo of ${restaurant.name}`}
              data-ai-hint={restaurant.imageHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <Badge className="absolute bottom-2 left-2">30-40 min</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-lg mb-1 truncate group-hover:text-primary">{restaurant.name}</CardTitle>
          <CardDescription className="truncate">{restaurant.cuisine}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <Star className="h-4 w-4 text-green-500 fill-green-500" />
            <span>{restaurant.rating.toFixed(1)}</span>
            <span className="mx-1">·</span>
            <span>{restaurant.location}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
