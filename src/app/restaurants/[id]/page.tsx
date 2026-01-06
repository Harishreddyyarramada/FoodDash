
'use client';

import { getRestaurantById, getMenuForRestaurant } from '@/lib/data';
import { notFound } from 'next/navigation';
import { MenuItemCard } from '@/components/restaurants/MenuItemCard';
import { Star, ChevronDown, ChevronLeft, ChevronRight, Clock, MapPin, NotebookPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { MenuItem } from '@/lib/types';
import { VegNonVegToggle } from '@/components/restaurants/VegNonVegToggle';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface RestaurantPageProps {
  params: { id: string };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const restaurant = getRestaurantById(params.id);
  
  if (!restaurant) {
    notFound();
  }

  const menu = useMemo(() => getMenuForRestaurant(params.id), [params.id]);
  
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    menu.forEach(item => categorySet.add(item.category));
    return ['All', ...Array.from(categorySet)];
  }, [menu]);

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMenu = useMemo(() => {
    return menu.filter(item => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const vegMatch = filter === 'all' || (filter === 'veg' && item.isVegetarian) || (filter === 'non-veg' && !item.isVegetarian);
      return categoryMatch && vegMatch;
    });
  }, [menu, activeCategory, filter]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
          <p className="text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link> / Anytown / <span className="font-semibold text-foreground">{restaurant.name}</span>
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start">
                  <div>
                      <h1 className="text-2xl font-bold font-headline">{restaurant.name}</h1>
                      <p className="text-muted-foreground">{restaurant.cuisine}</p>
                      <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4" /> {restaurant.location}
                      </p>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-lg text-green-600 border rounded-lg p-2 shadow-sm">
                      <Star className="h-5 w-5 fill-current" />
                      <span>{restaurant.rating.toFixed(1)}</span>
                  </div>
              </div>
              <Separator className="my-4"/>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                     <Clock className="h-5 w-5 text-primary" />
                     <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                      <NotebookPen className="h-5 w-5 text-primary" />
                      <span>{restaurant.priceForTwo}</span>
                  </div>
              </div>
          </div>
          
          <div className="sticky top-16 bg-gray-50 z-40 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold font-headline">Menu</h2>
              <VegNonVegToggle onFilterChange={setFilter} />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="rounded-full shrink-0"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <section>
            {categories.slice(1).map(category => {
              // Only render the category section if it's the active one or if 'All' is active
              if (activeCategory !== 'All' && activeCategory !== category) {
                return null;
              }
              const itemsForCategory = filteredMenu.filter(item => item.category === category);
              if (itemsForCategory.length === 0) return null;

              return (
                <div key={category} id={category.replace(/\s+/g, '-')} className="pt-6">
                  <h3 className="text-2xl font-bold font-headline mb-4">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {itemsForCategory.map(item => (
                      <MenuItemCard key={item.id} menuItem={item} />
                    ))}
                  </div>
                </div>
              )
            })}
             {/* Render all items if 'All' is selected */}
            {activeCategory === 'All' && categories.slice(1).map(category => {
                const itemsForCategory = filteredMenu.filter(item => item.category === category);
                if (itemsForCategory.length === 0) return null;
                return (
                  <div key={`all-${category}`} id={`all-${category.replace(/\s+/g, '-')}`} className="pt-6">
                    <h3 className="text-2xl font-bold font-headline mb-4">{category}</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {itemsForCategory.map(item => (
                        <MenuItemCard key={item.id} menuItem={item} />
                      ))}
                    </div>
                  </div>
                )
              })}
          </section>

          {filteredMenu.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No items match the current filter.</p>
            </div>
          )}
      </div>
    </div>
  );
}
