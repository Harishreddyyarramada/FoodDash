'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon, ChefHat } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useState, useEffect } from "react";

// Mock user data, assuming a logged-in state for demonstration
const mockUser = {
    displayName: "Jane Doe",
    email: "jane.doe@example.com",
    photoURL: "https://github.com/shadcn.png"
};

export function UserNav() {
    const [user, setUser] = useState<typeof mockUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking auth state
        setTimeout(() => {
            // To test the logged-out state, set this to null
            setUser(mockUser); 
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    if (!user) {
        return (
            <Button asChild>
                <Link href="/login">Sign In</Link>
            </Button>
        );
    }
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) {
            return names[0][0] + names[names.length - 1][0];
        }
        return name[0];
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/profile">
                        <DropdownMenuItem>
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                     <Link href="/orders">
                        <DropdownMenuItem>
                            <ChefHat className="mr-2 h-4 w-4" />
                            <span>My Orders</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setUser(null)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
