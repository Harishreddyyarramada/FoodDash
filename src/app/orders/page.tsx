
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { restaurants, menuItems } from '@/lib/data';
import type { Order, OrderItem } from '@/lib/types';

// Mock past orders
const mockOrders: Order[] = [
    {
        id: 'ab12cd34ef',
        restaurantId: '1',
        status: 'DELIVERED',
        date: '2024-07-28T18:30:00Z',
        total: 580.00,
        items: [
            { menuItemId: 'm1', quantity: 1 },
            { menuItemId: 'm4', quantity: 1 },
        ]
    },
    {
        id: 'gh56ij78kl',
        restaurantId: '3',
        status: 'CANCELLED',
        date: '2024-07-25T12:15:00Z',
        total: 420.00,
        items: [
            { menuItemId: 'm13', quantity: 1 },
            { menuItemId: 'm15', quantity: 1 },
        ]
    },
    {
        id: 'mn90op12qr',
        restaurantId: '5',
        status: 'DELIVERED',
        date: '2024-07-20T20:00:00Z',
        total: 850.00,
        items: [
            { menuItemId: 'm25', quantity: 1 },
            { menuItemId: 'm27', quantity: 1 },
        ]
    }
];

const getStatusBadgeVariant = (status: string): "default" | "destructive" | "secondary" => {
    switch (status) {
        case 'DELIVERED':
            return 'secondary';
        case 'CANCELLED':
            return 'destructive';
        default:
            return 'default';
    }
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(() => {
        // In a real app, you would fetch the user's orders from your backend.
        // For now, we'll use the mock data.
        setOrders(mockOrders);
    }, []);
    
    if (orders.length === 0) {
        return (
             <div className="container mx-auto px-4 py-8">
                <div className="text-center py-20">
                    <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
                    <h2 className="mt-4 text-2xl font-semibold">No past orders</h2>
                    <p className="mt-2 text-muted-foreground">You haven't placed any orders yet. Let's change that!</p>
                    <Button asChild className="mt-6">
                    <Link href="/">Start Ordering</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-headline font-bold mb-8">My Orders</h1>
            <div className="space-y-6">
                {orders.map(order => {
                    const restaurant = restaurants.find(r => r.id === order.restaurantId);
                    if (!restaurant) return null;

                    const orderItems = order.items.map(orderItem => {
                        const menuItem = menuItems.find(mi => mi.id === orderItem.menuItemId);
                        return { ...orderItem, menuItem };
                    }).filter(item => item.menuItem);

                    return (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                                            <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-headline">{restaurant.name}</CardTitle>
                                            <CardDescription>{restaurant.location}</CardDescription>
                                            <p className="text-sm text-muted-foreground mt-1">Order ID: {order.id}</p>
                                        </div>
                                    </div>
                                    <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">{order.status.toLowerCase()}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Separator className="my-4" />
                                <div>
                                    <h4 className="font-semibold mb-2">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        {orderItems.map(item => (
                                            <li key={item.menuItemId}>
                                                {item.quantity} x {item.menuItem?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
                                <span className="font-bold text-lg">Total: ₹{order.total.toFixed(2)}</span>
                                <div className="flex gap-2">
                                    <Button variant="outline">
                                        <FileText className="mr-2 h-4 w-4" />
                                        View Details
                                    </Button>
                                    <Button disabled={order.status !== 'DELIVERED'}>Reorder</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
