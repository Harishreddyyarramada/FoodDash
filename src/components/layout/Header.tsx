'use client';

import Link from 'next/link';
import { Search, Tag, HelpCircle, User, ShoppingCart } from 'lucide-react';
import { CartIcon } from '@/components/cart/CartIcon';
import { Button } from '@/components/ui/button';

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 214 214" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M106.583 2.00002C130.347 1.99369 153.606 10.4206 171.491 25.7061C189.376 40.9916 199.993 62.0673 201.258 84.5367C202.523 107.006 194.275 129.215 178.239 146.474C162.203 163.733 139.739 174.966 116.141 178.138L106.583 212L97.0249 178.138C73.4273 174.966 50.963 163.733 34.9272 146.474C18.8913 129.215 10.6437 107.006 11.9084 84.5367C13.1731 62.0673 23.7899 40.9916 41.6754 25.7061C59.5609 10.4206 82.8197 1.99369 106.583 2.00002ZM144.333 71.5834H68.8333V99.9167H97.1666V128.25H115.75V99.9167H144.333V71.5834Z" fill="hsl(var(--primary))"/>
  </svg>
)


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-headline text-xl font-bold">FoodDash</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="#">
              <Search className="mr-2" />
              Search
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/offers">
              <Tag className="mr-2" />
              Offers
              <span className="ml-1 text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#">
              <HelpCircle className="mr-2" />
              Help
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">
              <User className="mr-2" />
              Sign In
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/cart">
              <CartIcon />
              <span className="ml-2">Cart</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
