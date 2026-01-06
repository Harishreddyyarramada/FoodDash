import { UtensilsCrossed } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-muted-foreground" />
          <span className="font-headline text-lg font-bold text-muted-foreground">
            FoodDash
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FoodDash, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
