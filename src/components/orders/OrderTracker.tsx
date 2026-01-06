'use client';

import { useState, useEffect } from 'react';
import { PackageCheck, ChefHat, Bike, CheckCircle2, Package, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/lib/types';

const orderStatuses: { name: OrderStatus; icon: React.ElementType }[] = [
  { name: 'PLACED', icon: Package },
  { name: 'ACCEPTED', icon: PackageCheck },
  { name: 'PREPARING', icon: ChefHat },
  { name: 'PICKED', icon: Bike },
  { name: 'ON_THE_WAY', icon: Truck },
  { name: 'DELIVERED', icon: CheckCircle2 },
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
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-6 h-full w-0.5 bg-border -translate-x-1/2" />
          
          <ul className="space-y-8">
            {orderStatuses.map((status, index) => {
              const isActive = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              
              return (
                <li key={status.name} className="flex items-center gap-4">
                  <div className={cn(
                      "z-10 flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                    <status.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold text-lg transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {getStatusDisplayName(status.name)}
                    </h3>
                    {isCurrent && index < orderStatuses.length - 1 && (
                      <p className="text-sm text-primary animate-pulse">Updating...</p>
                    )}
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
