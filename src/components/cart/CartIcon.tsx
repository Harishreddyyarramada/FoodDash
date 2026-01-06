'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { Badge } from '@/components/ui/badge';

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
        >
          {itemCount}
        </Badge>
      )}
      <span className="sr-only">Shopping cart with {itemCount} items</span>
    </div>
  );
}
