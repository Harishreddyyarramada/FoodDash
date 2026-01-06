'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { CartItem, MenuItem } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  cartTotal: number;
  itemCount: number;
  cartRestaurantId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showClearCartDialog, setShowClearCartDialog] = useState(false);
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null);

  const cartRestaurantId = cartItems.length > 0 ? cartItems[0].item.restaurantId : null;

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const addToCart = (item: MenuItem) => {
    // Check if the new item is from a different restaurant
    if (cartRestaurantId && cartRestaurantId !== item.restaurantId) {
      setPendingItem(item);
      setShowClearCartDialog(true);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.item.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { item, quantity: 1 }];
    });
  };
  
  const handleConfirmClearCart = () => {
    clearCart();
    if (pendingItem) {
      // Use a timeout to ensure the state update for clearing cart is processed
      // before adding the new item.
      setTimeout(() => {
        setCartItems([{ item: pendingItem, quantity: 1 }]);
        setPendingItem(null);
      }, 0);
    }
    setShowClearCartDialog(false);
  };

  const handleCancelClearCart = () => {
    setPendingItem(null);
    setShowClearCartDialog(false);
  };


  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem
        )
      );
    }
  };

  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(cartItem => cartItem.item.id === itemId);
    return item ? item.quantity : 0;
  };

  const cartTotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
    0
  );

  const itemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        cartTotal,
        itemCount,
        cartRestaurantId,
      }}
    >
      {children}
       <AlertDialog open={showClearCartDialog} onOpenChange={setShowClearCartDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start a new cart?</AlertDialogTitle>
            <AlertDialogDescription>
              You have items from a different restaurant in your cart. Would you like to clear your current cart to add this item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelClearCart}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClearCart}>Clear Cart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
