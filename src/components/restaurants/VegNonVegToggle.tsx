
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VegNonVegToggleProps {
  onFilterChange: (filter: 'all' | 'veg' | 'non-veg') => void;
}

export function VegNonVegToggle({ onFilterChange }: VegNonVegToggleProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const handleFilterClick = (filter: 'all' | 'veg' | 'non-veg') => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex items-center gap-2 p-1 border rounded-lg bg-muted">
      <Button
        onClick={() => handleFilterClick('all')}
        variant={activeFilter === 'all' ? 'secondary' : 'ghost'}
        className={cn("px-3 py-1 h-auto text-sm", activeFilter === 'all' && 'bg-background shadow-sm')}
      >
        All
      </Button>
      <Button
        onClick={() => handleFilterClick('veg')}
        variant={activeFilter === 'veg' ? 'secondary' : 'ghost'}
        className={cn("px-3 py-1 h-auto text-sm", activeFilter === 'veg' && 'bg-background shadow-sm')}
      >
        Veg
      </Button>
      <Button
        onClick={() => handleFilterClick('non-veg')}
        variant={activeFilter === 'non-veg' ? 'secondary' : 'ghost'}
        className={cn("px-3 py-1 h-auto text-sm", activeFilter === 'non-veg' && 'bg-background shadow-sm')}
      >
        Non-Veg
      </Button>
    </div>
  );
}
