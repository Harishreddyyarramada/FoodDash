'use client';

import { getRestaurantById, getMenuForRestaurant } from '@/lib/data';
import { notFound } from 'next/navigation';
import { MenuItemCard } from '@/components/restaurants/MenuItemCard';
import { Star, ChevronDown, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RestaurantPageProps {
  params: { id: string };
}

function CouponCard({ title, code, icon }: { title: string, code: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm min-w-max">
            <div className="text-orange-500">{icon}</div>
            <div>
                <p className="font-bold text-lg">{title}</p>
                <p className="text-sm text-muted-foreground">{code}</p>
            </div>
        </div>
    )
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = getRestaurantById(params.id);
  
  if (!restaurant) {
    notFound();
  }

  const menu = getMenuForRestaurant(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
        <p className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link> / Anytown / <span className="font-semibold text-foreground">{restaurant.name}</span>
        </p>

        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold font-headline">{restaurant.name}</h1>
        </div>

        <Tabs defaultValue="order-online" className="w-full mb-6">
            <TabsList className="bg-transparent p-0 border-b-2 border-gray-200 rounded-none w-full justify-start">
                <TabsTrigger value="order-online" className="data-[state=active]:border-orange-500 data-[state=active]:border-b-2 data-[state=active]:text-orange-500 rounded-none">Order Online</TabsTrigger>
                <TabsTrigger value="dineout" className="data-[state=active]:border-orange-500 data-[state=active]:border-b-2 data-[state=active]:text-orange-500 rounded-none">Dineout</TabsTrigger>
            </TabsList>
            <TabsContent value="order-online">
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 my-6">
                    <div className="flex items-center gap-4 text-base mb-4">
                        <div className="flex items-center gap-1 font-semibold text-green-600">
                            <Star className="h-5 w-5 fill-current" />
                            <span>{restaurant.rating.toFixed(1)} ({restaurant.ratingCount})</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <p className="font-semibold">{restaurant.priceForTwo}</p>
                    </div>
                    <p className="font-bold text-orange-500 mb-4">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">Outlet</span>
                        <span className="text-muted-foreground">{restaurant.location}</span>
                        <ChevronDown className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-1" />
                     <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                            <div className="h-2.5 w-2.5 rounded-full border-2 border-gray-400"></div>
                            <div className="w-px h-6 bg-gray-300 my-1"></div>
                            <div className="h-2.5 w-2.5 rounded-full border-2 border-gray-400"></div>
                        </div>
                        <div>
                             <p className="font-semibold">{restaurant.deliveryTime}</p>
                        </div>
                    </div>
                </div>

                 <section className="py-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold font-headline">Deals for you</h2>
                         <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full">
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full">
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        <CouponCard title="Flat 50% Off" code="NO CODE REQUIRED" icon={<span className="text-4xl font-bold">%</span>} />
                        <CouponCard title="Items at ₹99" code="ON SELECT ITEMS" icon={
                            <div className="bg-orange-500 text-white p-2 rounded-lg text-xs font-bold">
                                DEAL<br/>OF DAY
                            </div>
                        } />
                        <CouponCard title="Flat ₹100 Off" code="USE SWIGGYIT" icon={<span className="text-4xl font-bold">%</span>} />
                    </div>
                </section>

                <div className="text-center my-10">
                    <p className="text-sm tracking-widest text-muted-foreground font-semibold">-- MENU --</p>
                </div>

                <section>
                    {menu.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menu.map(item => (
                        <MenuItemCard key={item.id} menuItem={item} />
                        ))}
                    </div>
                    ) : (
                    <p className="text-muted-foreground">This restaurant currently has no items on its menu.</p>
                    )}
                </section>
                
            </TabsContent>
            <TabsContent value="dineout">
                <p className="py-10 text-center text-muted-foreground">Dineout information will be available here soon.</p>
            </TabsContent>
        </Tabs>

        <div className="fixed bottom-8 right-1/2 translate-x-1/2 z-50">
            <Button className="bg-black text-white rounded-full shadow-lg h-14 px-8 text-lg hover:bg-gray-800">
                MENU
            </Button>
        </div>

    </div>
  );
}
