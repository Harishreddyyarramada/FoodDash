
'use client';

import Image from 'next/image';
import { PlusCircle, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import type { MenuItem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart/CartContext';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { VegNonVegIndicator } from './VegNonVegIndicator';

interface MenuItemCardProps {
  menuItem: MenuItem;
}

export function MenuItemCard({ menuItem }: MenuItemCardProps) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { toast } = useToast()
  const quantity = getItemQuantity(menuItem.id);

  const handleAddToCart = () => {
    addToCart(menuItem);
    toast({
      title: "Added to cart",
      description: `${menuItem.name} has been added to your cart.`,
    })
  };

  return (
    <Card className="flex flex-col h-full group">
        <div className="flex-grow p-4">
             <div className="flex justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <VegNonVegIndicator isVegetarian={menuItem.isVegetarian} />
                        {menuItem.tags?.includes('Best Seller') && <Badge variant="secondary" className="bg-amber-100 text-amber-800">Best Seller</Badge>}
                    </div>
                    <h3 className="font-bold font-headline">{menuItem.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{menuItem.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                        {menuItem.tags?.includes('Highly Rated') && 
                            <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                <Star className="h-4 w-4 fill-current" />
                                <span>Highly Rated</span>
                            </div>
                        }
                    </div>
                    <p className="text-base font-bold mt-2">₹{menuItem.price.toFixed(2)}</p>
                </div>
                <div className="relative h-28 w-28 rounded-lg overflow-hidden shrink-0">
                     <Image
                        src={menuItem.imageUrl}
                        alt={menuItem.name}
                        data-ai-hint={menuItem.imageHint}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[calc(100%-1rem)]">
                        {quantity > 0 ? (
                            <div className="flex items-center justify-between bg-background border rounded-md shadow-lg h-9">
                                <Button variant="ghost" size="icon" className="h-full w-9" onClick={() => updateQuantity(menuItem.id, quantity - 1)}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-semibold">{quantity}</span>
                                <Button variant="ghost" size="icon" className="h-full w-9" onClick={() => updateQuantity(menuItem.id, quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={handleAddToCart} size="sm" className="w-full shadow-lg">
                                Add
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {quantity > 0 && (
            <CardFooter className="p-2 pt-0">
                <Button asChild className="w-full" variant="secondary">
                    <Link href="/cart">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Cart
                    </Link>
                </Button>
            </CardFooter>
        )}
    </Card>
  );
}
