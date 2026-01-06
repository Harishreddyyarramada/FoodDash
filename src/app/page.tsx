import { RestaurantList } from '@/components/restaurants/RestaurantList';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
          Restaurants to explore
        </h1>
        <p className="text-lg text-muted-foreground">
          Cheesilicious pizzas to make every day extraordinary.
        </p>
      </section>
      
      <section>
        <RestaurantList />
      </section>
    </div>
  );
}
