'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';

const offers = [
  {
    title: 'Pongal Special',
    description: 'Get 30% OFF on orders above ₹250',
    code: 'PONGAL30',
    imageUrl: 'https://picsum.photos/seed/pongal/800/400',
    imageHint: 'pongal festival',
  },
  {
    title: 'Christmas Feast',
    description: 'Flat 25% OFF on all cakes and pastries',
    code: 'XMAS25',
    imageUrl: 'https://picsum.photos/seed/christmas/800/400',
    imageHint: 'christmas celebration',
  },
  {
    title: 'New User Offer',
    description: 'Get 50% OFF on your first order up to ₹100',
    code: 'NEW50',
    imageUrl: 'https://picsum.photos/seed/foodoffer/800/400',
    imageHint: 'food promotion',
  },
  {
    title: 'Weekend Bonanza',
    description: 'Order for ₹500 and get free delivery',
    code: 'WEEKEND',
    imageUrl: 'https://picsum.photos/seed/weekend/800/400',
    imageHint: 'weekend mood',
  },
];

export default function OffersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-headline font-bold mb-8">Deals & Offers</h1>
      <div className="space-y-8">
        {offers.map((offer, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-60 w-full">
              <Image
                src={offer.imageUrl}
                alt={offer.title}
                data-ai-hint={offer.imageHint}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl font-bold text-white">{offer.title}</h2>
                <p className="text-lg text-white/90">{offer.description}</p>
              </div>
            </div>
            <CardContent className="p-6 bg-background flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Ticket className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Use code</p>
                  <p className="text-xl font-bold tracking-wider">{offer.code}</p>
                </div>
              </div>
              <Button>Copy Code</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
