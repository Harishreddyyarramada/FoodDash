'use client';

import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
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
import { useToast } from "@/hooks/use-toast"

interface MenuItemCardProps {
  menuItem: MenuItem;
}

export function MenuItemCard({ menuItem }: MenuItemCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast()

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
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-bold">${menuItem.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
