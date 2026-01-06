'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Banknote, Building2, ChevronRight, ChevronLeft } from 'lucide-react';
import { offersData } from '@/lib/offer-data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

const festivalBanner = offersData.festivalBanners[0];
const couponCarousel = offersData.couponCarousel;
const bankOffers = offersData.bankOffers;

export default function OffersPage() {
  const { toast } = useToast();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: `Coupon code "${code}" has been copied to your clipboard.`,
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Festival Hero Banner */}
        <section className="mb-12">
          <Card className="overflow-hidden shadow-2xl rounded-2xl border-none">
            <div className="relative h-64 w-full">
              <Image
                src={festivalBanner.imageUrl}
                alt={festivalBanner.title}
                data-ai-hint={festivalBanner.imageHint}
                fill
                className="object-cover"
              />
              <div 
                className="absolute inset-0" 
                style={{ background: `linear-gradient(270deg, ${festivalBanner.gradientFrom} 0%, ${festivalBanner.gradientTo} 100%)`, opacity: 0.8 }}
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h1 className="text-4xl font-headline font-extrabold text-white drop-shadow-lg">{festivalBanner.title}</h1>
                <p className="text-lg text-white/90 mt-2 max-w-lg drop-shadow-md">{festivalBanner.description}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Coupon Carousel */}
        <section className="mb-12">
            <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                <Ticket className="text-primary h-7 w-7" />
                Top Coupons
            </h2>
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                {couponCarousel.map((coupon, index) => (
                    <CarouselItem key={index} className="pl-4 basis-auto">
                         <Card className="w-80 border-dashed border-2 hover:border-primary transition-all hover:shadow-lg">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Ticket className="h-8 w-8 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-lg">{coupon.title}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{coupon.code}</p>
                                </div>
                                <Button size="sm" variant="ghost" onClick={() => handleCopyCode(coupon.code)}>Copy</Button>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 -translate-x-1/2"/>
                <CarouselNext className="absolute right-0 translate-x-1/2"/>
            </Carousel>
        </section>

        {/* Bank & Wallet Offers */}
        <section className="mb-12">
            <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                <Banknote className="text-primary h-7 w-7" />
                Bank & Wallet Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bankOffers.map((offer, index) => (
                    <Card key={index} className="flex items-start gap-4 p-4 hover:shadow-lg transition-shadow rounded-xl">
                        <div className="relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0">
                           <Image src={offer.bankLogoUrl} alt={`${offer.bankName} logo`} data-ai-hint={offer.bankName} layout="fill" objectFit="contain" />
                        </div>
                        <div>
                            <p className="font-semibold text-base leading-tight">{offer.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">Use Code: <span className="font-bold text-foreground">{offer.code}</span></p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
        
        {/* All Restaurant Offers */}
        <section>
             <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                <Building2 className="text-primary h-7 w-7" />
                All Restaurant Offers
            </h2>
            <div className="space-y-6">
            {offersData.restaurantOffers.map((offer, index) => (
            <Card key={index} className="overflow-hidden shadow-sm hover:shadow-xl transition-shadow rounded-xl">
                <div className="flex">
                    <div className="relative h-36 w-36 flex-shrink-0">
                        <Image
                            src={offer.imageUrl}
                            alt={offer.title}
                            data-ai-hint={offer.imageHint}
                            fill
                            className="object-cover"
                        />
                         <Badge variant="destructive" className="absolute bottom-2 left-2">{offer.discount}</Badge>
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                            <h3 className="text-lg font-bold font-headline">{offer.title}</h3>
                            <p className="text-sm text-muted-foreground">{offer.cuisine} • {offer.location}</p>
                            <p className="text-sm mt-2">{offer.description}</p>
                        </div>
                         <Button variant="link" className="p-0 h-auto justify-start text-primary self-start">
                            View Restaurant <ChevronRight className="h-4 w-4 ml-1"/>
                        </Button>
                    </div>
                </div>
            </Card>
            ))}
            </div>
        </section>
      </div>
    </div>
  );
}