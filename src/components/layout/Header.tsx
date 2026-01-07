'use client';

import Link from 'next/link';
import { Search, Tag, HelpCircle, MapPin } from 'lucide-react';
import { CartIcon } from '@/components/cart/CartIcon';
import { Button } from '@/components/ui/button';
import { NearbyDishes } from '@/components/recommendations/NearbyDishes';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserNav } from '@/components/auth/UserNav';

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="hsl(var(--primary))"/>
    <path d="M15.71 10.29L14.29 8.87C13.9 8.48 13.27 8.48 12.88 8.87L11 10.75V7C11 6.45 10.55 6 10 6C9.45 6 9 6.45 9 7V10.75L7.12 8.87C6.73 8.48 6.1 8.48 5.71 8.87L4.29 10.29C3.9 10.68 3.9 11.31 4.29 11.7L9.29 16.7C9.68 17.09 10.31 17.09 10.7 16.7L11.41 16L15.71 11.7C16.1 11.32 16.1 10.68 15.71 10.29Z" fill="hsl(var(--primary))"/>
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
                    <Icon className="h-5 w-5 mr-2" />
                    {label}
                  </>
                ) : (
                  <Link href={href}>
                    <Icon className="h-5 w-5 mr-2" />
                    {label}
                    {isNew && <span className="ml-1.5 text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
                  </Link>
                )}
              </Button>
            );
          })}
          
          <div className="flex items-center gap-2 border-l ml-2 pl-2">
            <Button variant="ghost" asChild>
                <Link href="/cart">
                    <CartIcon />
                    <span className="sr-only">Cart</span>
                </Link>
            </Button>
            <UserNav />
          </div>
        </nav>
      </div>
      <NearbyDishes open={showNearbyDishes} onOpenChange={setShowNearbyDishes} />
    </header>
  );
}
