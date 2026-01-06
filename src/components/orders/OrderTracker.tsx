'use client';

import { useState, useEffect } from 'react';
import { PackageCheck, Soup, Bike, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const orderStatuses = [
  { name: 'Order Placed', icon: PackageCheck },
  { name: 'Preparing Food', icon: Soup },
  { name: 'Out for Delivery', icon: Bike },
  { name: 'Delivered', icon: CheckCircle2 },
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
                      {status.name}
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
