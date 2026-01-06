import { getRestaurantById, getMenuForRestaurant } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MenuItemCard } from '@/components/restaurants/MenuItemCard';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RestaurantPageProps {
  params: { id: string };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = getRestaurantById(params.id);
  
  if (!restaurant) {
    notFound();
  }

  const menu = getMenuForRestaurant(params.id);

  return (
    <div>
      <section className="relative h-64 md:h-80 w-full">
        <Image
          src={restaurant.imageUrl}
          alt={`Promotional image for ${restaurant.name}`}
          data-ai-hint={restaurant.imageHint}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative mx-auto h-full flex flex-col justify-end pb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-white mb-2">
            {restaurant.name}
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-lg text-white">{restaurant.cuisine}</p>
            <Badge variant="secondary" className="flex items-center gap-1 text-base">
              <Star className="h-4 w-4 text-primary" fill="currentColor" />
              <span className="font-bold">{restaurant.rating.toFixed(1)}</span>
            </Badge>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-headline font-semibold mb-8">Menu</h2>
        {menu.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menu.map(item => (
              <MenuItemCard key={item.id} menuItem={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">This restaurant currently has no items on its menu.</p>
        )}
      </section>
    </div>
  );
}
