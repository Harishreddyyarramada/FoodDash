
'use client';

import { useState, useEffect } from 'react';
import { PackageCheck, ChefHat, Bike, CheckCircle2, Package, Truck, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const orderStatuses: { name: OrderStatus; icon: React.ElementType; description: string; }[] = [
  { name: 'PLACED', icon: Package, description: 'Your order has been received.' },
  { name: 'ACCEPTED', icon: PackageCheck, description: 'The restaurant has confirmed your order.' },
  { name: 'PREPARING', icon: ChefHat, description: 'Your food is being prepared.' },
  { name: 'PICKED', icon: Bike, description: 'A delivery partner has picked up your order.' },
  { name: 'ON_THE_WAY', icon: Truck, description: 'Your order is on its way to you.' },
  { name: 'DELIVERED', icon: CheckCircle2, description: 'Your order has been delivered. Enjoy!' },
];

const cancelledStatus = { name: 'CANCELLED', icon: XCircle, description: 'Your order has been cancelled.' };


export function OrderTracker() {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [showCancelButton, setShowCancelButton] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    // Hide cancel button after 2 minutes
    const cancelTimer = setTimeout(() => {
      setShowCancelButton(false);
    }, 120000); // 2 minutes in milliseconds

    return () => clearTimeout(cancelTimer);
  }, []);

  useEffect(() => {
    // Stop status progression if order is cancelled
    if (isCancelled) return;

    if (currentStatusIndex < orderStatuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatusIndex(prevIndex => prevIndex + 1);
      }, 5000); // Update status every 5 seconds for demonstration
      return () => clearTimeout(timer);
    }
  }, [currentStatusIndex, isCancelled]);
  
  const handleCancelOrder = () => {
      setIsCancelled(true);
      setShowCancelButton(false);
  };

  const getStatusDisplayName = (status: OrderStatus) => {
    switch (status) {
      case 'PLACED': return 'Order Placed';
      case 'ACCEPTED': return 'Order Accepted';
      case 'PREPARING': return 'Preparing Food';
      case 'PICKED': return 'Picked Up';
      case 'ON_THE_WAY': return 'Out for Delivery';
      case 'DELIVERED': return 'Delivered';
      case 'CANCELLED': return 'Order Cancelled';
      default: return 'Unknown Status';
    }
  };
  
  const displayedStatuses = isCancelled 
    ? [orderStatuses[0], cancelledStatus] 
    : orderStatuses;
  
  const activeStatusIndex = isCancelled ? 1 : currentStatusIndex;


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Track Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pt-4">
          {/* Timeline line */}
           <div className="absolute left-6 top-6 h-[calc(100%-2.5rem)] w-0.5 bg-border -translate-x-1/2" />
          
          <ul className="space-y-10">
            {displayedStatuses.map((status, index) => {
              const isActive = index <= activeStatusIndex;
              const isCurrent = index === activeStatusIndex;
              const isCancelledStatus = status.name === 'CANCELLED';
              
              return (
                <li key={status.name} className="flex items-start gap-4">
                  <div className={cn(
                      "z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500",
                       isActive && !isCancelledStatus && "bg-primary scale-110 shadow-lg",
                       isActive && isCancelledStatus && "bg-destructive scale-110 shadow-lg",
                       !isActive && "bg-muted scale-90",
                       isCurrent && !isCancelledStatus && "ring-4 ring-primary/20",
                       isCurrent && isCancelledStatus && "ring-4 ring-destructive/20",
                    )}>
                     <status.icon className={cn(
                         "h-6 w-6 transition-colors", 
                         isActive ? "text-primary-foreground" : "text-muted-foreground"
                     )} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground",
                      isCancelledStatus && "text-destructive"
                    )}>
                      {getStatusDisplayName(status.name)}
                    </h3>
                     <p className={cn("text-sm transition-colors", isActive ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
                        {isCurrent && index < orderStatuses.length - 1 && !isCancelled
                            ? 'Updating...'
                            : status.description
                        }
                     </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
      {showCancelButton && !isCancelled && (
        <CardFooter className="border-t pt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">Cancel Order</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You can only cancel within the first 2 minutes of placing the order.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelOrder}>Yes, Cancel Order</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
}
