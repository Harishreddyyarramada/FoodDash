import { RestaurantList } from '@/components/restaurants/RestaurantList';
import { Recommendations } from '@/components/recommendations/Recommendations';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
          Find your next meal
        </h1>
        <p className="text-lg text-muted-foreground">
          Delicious food is just a few clicks away.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-6">Recommended for You</h2>
        <Recommendations />
      </section>
      
      <section>
        <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-6">All Restaurants</h2>
        <RestaurantList />
      </section>
    </div>
  );
}
