'use client';

import { useState, useEffect } from 'react';
import { PackageCheck, ChefHat, Bike, CheckCircle2, Package, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/lib/types';

const orderStatuses: { name: OrderStatus; icon: React.ElementType; description: string; }[] = [
  { name: 'PLACED', icon: Package, description: 'Your order has been received.' },
  { name: 'ACCEPTED', icon: PackageCheck, description: 'The restaurant has confirmed your order.' },
  { name: 'PREPARING', icon: ChefHat, description: 'Your food is being prepared.' },
  { name: 'PICKED', icon: Bike, description: 'A delivery partner has picked up your order.' },
  { name: 'ON_THE_WAY', icon: Truck, description: 'Your order is on its way to you.' },
  { name: 'DELIVERED', icon: CheckCircle2, description: 'Your order has been delivered. Enjoy!' },
];

export function OrderTracker() {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    if (currentStatusIndex < orderStatuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatusIndex(prevIndex => prevIndex + 1);
      }, 5000); // Update status every 5 seconds for demonstration
      return () => clearTimeout(timer);
    }
  }, [currentStatusIndex]);

  const getStatusDisplayName = (status: OrderStatus) => {
    switch (status) {
      case 'PLACED': return 'Order Placed';
      case 'ACCEPTED': return 'Order Accepted';
      case 'PREPARING': return 'Preparing Food';
      case 'PICKED': return 'Picked Up';
      case 'ON_THE_WAY': return 'Out for Delivery';
      case 'DELIVERED': return 'Delivered';
      default: return 'Unknown Status';
    }
  };

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
            {orderStatuses.map((status, index) => {
              const isActive = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              
              return (
                <li key={status.name} className="flex items-start gap-4">
                  <div className={cn(
                      "z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500",
                      isActive ? "bg-primary scale-110 shadow-lg" : "bg-muted scale-90",
                      isCurrent && "ring-4 ring-primary/20"
                    )}>
                     <status.icon className={cn("h-6 w-6 transition-colors", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {getStatusDisplayName(status.name)}
                    </h3>
                     <p className={cn("text-sm transition-colors", isActive ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
                        {isCurrent && index < orderStatuses.length - 1 
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
    </Card>
  );
}
