'use client';

import Link from 'next/link';
import { Search, Tag, HelpCircle, User, MapPin } from 'lucide-react';
import { CartIcon } from '@/components/cart/CartIcon';
import { Button } from '@/components/ui/button';
import { NearbyDishes } from '@/components/recommendations/NearbyDishes';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 214 214" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M106.583 2.00002C130.347 1.99369 153.606 10.4206 171.491 25.7061C189.376 40.9916 199.993 62.0673 201.258 84.5367C202.523 107.006 194.275 129.215 178.239 146.474C162.203 163.733 139.739 174.966 116.141 178.138L106.583 212L97.0249 178.138C73.4273 174.966 50.963 163.733 34.9272 146.474C18.8913 129.215 10.6437 107.006 11.9084 84.5367C13.1731 62.0673 23.7899 40.9916 41.6754 25.7061C59.5609 10.4206 82.8197 1.99369 106.583 2.00002ZM144.333 71.5834H68.8333V99.9167H97.1666V128.25H115.75V99.9167H144.333V71.5834Z" fill="hsl(var(--primary))"/>
  </svg>
)

export function Header() {
  const [showNearbyDishes, setShowNearbyDishes] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const searchInput = document.getElementById('main-search-bar');
      if (searchInput) {
        searchInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      router.push('/');
    }
  };

  const navLinks = [
    { key: 'search', icon: Search, label: 'Search', onClick: handleSearchClick, href: '/' },
    { key: 'offers', icon: Tag, label: 'Offers', href: '/offers', isNew: true },
    { key: 'help', icon: HelpCircle, label: 'Help', href: '/help' },
    { key: 'login', icon: User, label: 'Sign In', href: '/login' },
    { key: 'cart', icon: CartIcon, label: 'Cart', href: '/cart' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-headline text-xl font-bold">FoodDash</span>
        </Link>
        <nav className="flex items-center gap-1">
           <Button variant="ghost" onClick={() => setShowNearbyDishes(true)}>
            <MapPin className="mr-2 h-5 w-5" />
            Near Me
          </Button>

          {navLinks.map(({ key, icon: Icon, label, isNew, href, onClick }) => {
            const isSearchButton = key === 'search';
            const isActive = !isSearchButton && pathname === href;

            return (
              <Button
                key={key}
                variant="ghost"
                asChild={!onClick}
                onClick={onClick}
                className={cn(isActive && "bg-accent text-accent-foreground")}
              >
                {onClick ? (
                  <>
                    <Icon className={cn("h-5 w-5", label !== 'Cart' && "mr-2")} />
                    {label}
                  </>
                ) : (
                  <Link href={href}>
                    <Icon className={cn("h-5 w-5", label !== 'Cart' && "mr-2")} />
                    {label}
                    {isNew && <span className="ml-1.5 text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
                  </Link>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
      <NearbyDishes open={showNearbyDishes} onOpenChange={setShowNearbyDishes} />
    </header>
  );
}
