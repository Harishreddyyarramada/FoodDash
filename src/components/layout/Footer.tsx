import Link from 'next/link';

const Logo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-foreground">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
        <path d="M15.71 10.29L14.29 8.87C13.9 8.48 13.27 8.48 12.88 8.87L11 10.75V7C11 6.45 10.55 6 10 6C9.45 6 9 6.45 9 7V10.75L7.12 8.87C6.73 8.48 6.1 8.48 5.71 8.87L4.29 10.29C3.9 10.68 3.9 11.31 4.29 11.7L9.29 16.7C9.68 17.09 10.31 17.09 10.7 16.7L11.41 16L15.71 11.7C16.1 11.32 16.1 10.68 15.71 10.29Z" fill="currentColor"/>
    </svg>
)

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
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
