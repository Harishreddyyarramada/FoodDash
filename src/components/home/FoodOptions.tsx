'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const foodOptions = [
  { name: 'Biryani', imageId: 'food-options-biryani' },
  { name: 'Pizza', imageId: 'food-options-pizza' },
  { name: 'Cake', imageId: 'food-options-cake' },
  { name: 'Burger', imageId: 'food-options-burger' },
  { name: 'Ice Cream', imageId: 'food-options-ice-cream' },
  { name: 'Shawarma', imageId: 'food-options-shawarma' },
  { name: 'Noodles', imageId: 'food-options-noodles' },
  { name: 'Pastry', imageId: 'food-options-pastry' },
  { name: 'Kebab', imageId: 'food-options-kebab' },
  { name: 'Salad', imageId: 'food-options-salad' },
  { name: 'Momo', imageId: 'food-options-momo' },
  { name: 'Tea', imageId: 'food-options-tea' },
  { name: 'Pasta', imageId: 'food-options-pasta' },
  { name: 'Paratha', imageId: 'food-options-paratha' },
];

const getImageData = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: '', hint: '' };
};

export function FoodOptions() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">Order our best food options</h2>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {foodOptions.map((option, index) => {
            const imageData = getImageData(option.imageId);
            return (
              <CarouselItem key={index} className="basis-1/5 md:basis-1/7 lg:basis-1/8">
                <Link href={`/search?q=${option.name.toLowerCase()}`} className="group">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-32 h-32">
                        <Image
                            src={imageData.url}
                            alt={option.name}
                            data-ai-hint={imageData.hint}
                            fill
                            className="object-cover rounded-full group-hover:scale-105 transition-transform"
                        />
                    </div>
                    <p className="font-semibold text-center mt-2 group-hover:text-primary">{option.name}</p>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
