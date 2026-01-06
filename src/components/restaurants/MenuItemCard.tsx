'use client';

import Image from 'next/image';
import { PlusCircle, Minus, Plus, ShoppingCart } from 'lucide-react';
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
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={menuItem.imageUrl}
            alt={menuItem.name}
            data-ai-hint={menuItem.imageHint}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-1">{menuItem.name}</CardTitle>
        <CardDescription>{menuItem.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <div className="flex justify-between items-center w-full">
            <p className="text-lg font-bold">₹{menuItem.price.toFixed(2)}</p>
            {quantity > 0 ? (
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(menuItem.id, quantity - 1)}>
                <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(menuITem.id, quantity + 1)}>
                <Plus className="h-4 w-4" />
                </Button>
            </div>
            ) : (
            <Button onClick={handleAddToCart} size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
            )}
        </div>
        {quantity > 0 && (
            <Button asChild className="w-full" variant="secondary">
                <Link href="/cart">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    View Cart & Checkout
                </Link>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
