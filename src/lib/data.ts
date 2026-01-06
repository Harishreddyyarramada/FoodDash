
import type { Restaurant, MenuItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://placehold.co/600x400', hint: 'placeholder' };
};

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Pizza Palace',
    cuisine: 'Italian',
    rating: 4.5,
    ratingCount: '3.1K+ ratings',
    location: '123 Main St, Anytown',
    imageUrl: getImage('restaurant-1').url,
    imageHint: getImage('restaurant-1').hint,
    priceForTwo: '₹350 for two',
    deliveryTime: '30-35 mins',
  },
  {
    id: '2',
    name: 'Sushi Sensation',
    cuisine: 'Japanese',
    rating: 4.8,
    ratingCount: '4.5K+ ratings',
    location: '456 Oak Ave, Anytown',
    imageUrl: getImage('restaurant-2').url,
    imageHint: getImage('restaurant-2').hint,
    priceForTwo: '₹700 for two',
    deliveryTime: '40-45 mins',
  },
  {
    id: '3',
    name: 'Burger Bonanza',
    cuisine: 'American',
    rating: 4.2,
    ratingCount: '2.8K+ ratings',
    location: '789 Pine Ln, Anytown',
    imageUrl: getImage('restaurant-3').url,
    imageHint: getImage('restaurant-3').hint,
    priceForTwo: '₹400 for two',
    deliveryTime: '25-30 mins',
  },
  {
    id: '4',
    name: 'Green Goodness',
    cuisine: 'Healthy',
    rating: 4.9,
    ratingCount: '5K+ ratings',
    location: '101 Maple Dr, Anytown',
    imageUrl: getImage('restaurant-4').url,
    imageHint: getImage('restaurant-4').hint,
    priceForTwo: '₹500 for two',
    deliveryTime: '20-25 mins',
  },
   {
    id: '5',
    name: 'Biryani House',
    cuisine: 'Indian',
    rating: 4.6,
    ratingCount: '6.2K+ ratings',
    location: '202 Elm St, Anytown',
    imageUrl: getImage('restaurant-5').url,
    imageHint: getImage('restaurant-5').hint,
    priceForTwo: '₹450 for two',
    deliveryTime: '35-40 mins',
  },
  {
    id: '6',
    name: 'Cake Corner',
    cuisine: 'Desserts',
    rating: 4.7,
    ratingCount: '3.9K+ ratings',
    location: '303 Birch Rd, Anytown',
    imageUrl: getImage('restaurant-6').url,
    imageHint: getImage('restaurant-6').hint,
    priceForTwo: '₹250 for two',
    deliveryTime: '45-50 mins',
  },
];

export const menuItems: MenuItem[] = [
  // Pizza Palace
  { id: 'm1', restaurantId: '1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 250, imageUrl: getImage('food-pizza-margherita').url, imageHint: getImage('food-pizza-margherita').hint, category: 'Pizza', isVegetarian: true, tags: ['Best Seller'] },
  { id: 'm2', restaurantId: '1', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and cheese.', price: 300, imageUrl: getImage('food-pizza-pepperoni').url, imageHint: getImage('food-pizza-pepperoni').hint, category: 'Pizza', isVegetarian: false },
  { id: 'm3', restaurantId: '1', name: 'Veggie Supreme Pizza', description: 'Onions, peppers, olives, mushrooms.', price: 280, imageUrl: getImage('food-pizza-veggie').url, imageHint: getImage('food-pizza-veggie').hint, category: 'Pizza', isVegetarian: true, tags: ['Highly Rated'] },
  { id: 'm4', restaurantId: '1', name: 'BBQ Chicken Pizza', description: 'BBQ sauce, chicken, and red onions.', price: 320, imageUrl: getImage('food-pizza-bbq').url, imageHint: getImage('food-pizza-bbq').hint, category: 'Pizza', isVegetarian: false },
  { id: 'm5', restaurantId: '1', name: 'Pasta Carbonara', description: 'Creamy pasta with bacon.', price: 280, imageUrl: getImage('food-pasta-carbonara').url, imageHint: getImage('food-pasta-carbonara').hint, category: 'Pasta', isVegetarian: false },
  { id: 'm6', restaurantId: '1', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 120, imageUrl: getImage('food-garlic-bread').url, imageHint: getImage('food-garlic-bread').hint, category: 'Sides', isVegetarian: true },

  // Sushi Sensation
  { id: 'm7', restaurantId: '2', name: 'California Roll', description: 'Crab, avocado, and cucumber.', price: 450, imageUrl: getImage('food-sushi-california').url, imageHint: getImage('food-sushi-california').hint, category: 'Sushi', isVegetarian: false, tags: ['Best Seller'] },
  { id: 'm8', restaurantId: '2', name: 'Salmon Nigiri', description: 'Fresh salmon over pressed rice.', price: 550, imageUrl: getImage('food-sushi-salmon').url, imageHint: getImage('food-sushi-salmon').hint, category: 'Sushi', isVegetarian: false },
  { id: 'm9', restaurantId: '2', name: 'Spicy Tuna Roll', description: 'Tuna with spicy mayo.', price: 500, imageUrl: getImage('food-sushi-tuna').url, imageHint: getImage('food-sushi-tuna').hint, category: 'Sushi', isVegetarian: false, tags: ['Highly Rated'] },
  { id: 'm10', restaurantId: '2', name: 'Dragon Roll', description: 'Eel, crab, cucumber, and avocado.', price: 700, imageUrl: getImage('food-sushi-dragon').url, imageHint: getImage('food-sushi-dragon').hint, category: 'Sushi', isVegetarian: false },
  { id: 'm11', restaurantId: '2', name: 'Miso Soup', description: 'Traditional Japanese soup.', price: 150, imageUrl: getImage('food-miso-soup').url, imageHint: getImage('food-miso-soup').hint, category: 'Sides', isVegetarian: true },
  { id: 'm12', restaurantId: '2', name: 'Edamame', description: 'Steamed and salted soybeans.', price: 250, imageUrl: getImage('food-edamame').url, imageHint: getImage('food-edamame').hint, category: 'Sides', isVegetarian: true },

  // Burger Bonanza
  { id: 'm13', restaurantId: '3', name: 'Classic Cheeseburger', description: 'Beef patty, cheese, lettuce, tomato.', price: 220, imageUrl: getImage('food-burger-classic').url, imageHint: getImage('food-burger-classic').hint, category: 'Burgers', isVegetarian: false, tags: ['Best Seller'] },
  { id: 'm14', restaurantId: '3', name: 'Veggie Burger', description: 'Plant-based patty with all fixings.', price: 200, imageUrl: getImage('food-burger-veggie').url, imageHint: getImage('food-burger-veggie').hint, category: 'Burgers', isVegetarian: true },
  { id: 'm15', restaurantId: '3', name: 'Bacon Deluxe Burger', description: 'Beef patty, bacon, cheese, and special sauce.', price: 280, imageUrl: getImage('food-burger-bacon').url, imageHint: getImage('food-burger-bacon').hint, category: 'Burgers', isVegetarian: false },
  { id: 'm16', restaurantId: '3', name: 'Spicy Chicken Burger', description: 'Crispy chicken with a spicy kick.', price: 250, imageUrl: getImage('food-burger-chicken').url, imageHint: getImage('food-burger-chicken').hint, category: 'Burgers', isVegetarian: false },
  { id: 'm17', restaurantId: '3', name: 'French Fries', description: 'Golden crispy french fries.', price: 100, imageUrl: getImage('food-fries').url, imageHint: getImage('food-fries').hint, category: 'Sides', isVegetarian: true, tags: ['Highly Rated'] },
  { id: 'm18', restaurantId: '3', name: 'Onion Rings', description: 'Battered and fried onion rings.', price: 120, imageUrl: getImage('food-onion-rings').url, imageHint: getImage('food-onion-rings').hint, category: 'Sides', isVegetarian: true },

  // Green Goodness
  { id: 'm19', restaurantId: '4', name: 'Caesar Salad', description: 'Romaine, croutons, parmesan, Caesar dressing.', price: 300, imageUrl: getImage('food-salad-caesar').url, imageHint: getImage('food-salad-caesar').hint, category: 'Salads', isVegetarian: true },
  { id: 'm20', restaurantId: '4', name: 'Greek Salad', description: 'Tomatoes, cucumbers, olives, feta.', price: 320, imageUrl: getImage('food-salad-greek').url, imageHint: getImage('food-salad-greek').hint, category: 'Salads', isVegetarian: true, tags: ['Best Seller'] },
  { id: 'm21', restaurantId: '4', name: 'Quinoa Bowl', description: 'Quinoa with roasted vegetables and lemon vinaigrette.', price: 350, imageUrl: getImage('food-quinoa-bowl').url, imageHint: getImage('food-quinoa-bowl').hint, category: 'Bowls', isVegetarian: true },
  { id: 'm22', restaurantId: '4', name: 'Avocado Toast', description: 'Smashed avocado on whole-grain toast.', price: 280, imageUrl: getImage('food-avocado-toast').url, imageHint: getImage('food-avocado-toast').hint, category: 'Breakfast', isVegetarian: true, tags: ['Highly Rated'] },
  { id: 'm23', restaurantId: '4', name: 'Green Smoothie', description: 'Spinach, kale, banana, and almond milk.', price: 200, imageUrl: getImage('food-green-smoothie').url, imageHint: getImage('food-green-smoothie').hint, category: 'Drinks', isVegetarian: true },
  { id: 'm24', restaurantId: '4', name: 'Berry Smoothie', description: 'Mixed berries, yogurt, and honey.', price: 200, imageUrl: getImage('food-berry-smoothie').url, imageHint: getImage('food-berry-smoothie').hint, category: 'Drinks', isVegetarian: true },

  // Biryani House
  { id: 'm25', restaurantId: '5', name: 'Chicken Biryani', description: 'Aromatic basmati rice with chicken.', price: 350, imageUrl: getImage('food-biryani-chicken').url, imageHint: getImage('food-biryani-chicken').hint, category: 'Biryani', isVegetarian: false, tags: ['Best Seller', 'Highly Rated'] },
  { id: 'm26', restaurantId: '5', name: 'Vegetable Biryani', description: 'Aromatic basmati rice with vegetables.', price: 300, imageUrl: getImage('food-biryani-veg').url, imageHint: getImage('food-biryani-veg').hint, category: 'Biryani', isVegetarian: true },
  { id: 'm27', restaurantId: '5', name: 'Mutton Biryani', description: 'Tender mutton cooked with fragrant rice.', price: 450, imageUrl: getImage('food-biryani-mutton').url, imageHint: getImage('food-biryani-mutton').hint, category: 'Biryani', isVegetarian: false },
  { id: 'm28', restaurantId: '5', name: 'Fish Biryani', description: 'Flaky fish pieces in a spicy rice masala.', price: 400, imageUrl: getImage('food-biryani-fish').url, imageHint: getImage('food-biryani-fish').hint, category: 'Biryani', isVegetarian: false },
  { id: 'm29', restaurantId: '5', name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes.', price: 80, imageUrl: getImage('food-samosa').url, imageHint: getImage('food-samosa').hint, category: 'Appetizers', isVegetarian: true },
  { id: 'm30', restaurantId: '5', name: 'Gulab Jamun', description: 'Sweet milk solids-based dessert.', price: 100, imageUrl: getImage('food-gulab-jamun').url, imageHint: getImage('food-gulab-jamun').hint, category: 'Desserts', isVegetarian: true },

  // Cake Corner
  { id: 'm31', restaurantId: '6', name: 'Chocolate Truffle Cake', description: 'Rich and decadent chocolate cake.', price: 500, imageUrl: getImage('food-cake-chocolate').url, imageHint: getImage('food-cake-chocolate').hint, category: 'Cakes', isVegetarian: true, tags: ['Best Seller'] },
  { id: 'm32', restaurantId: '6', name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese.', price: 550, imageUrl: getImage('food-cake-red-velvet').url, imageHint: getImage('food-cake-red-velvet').hint, category: 'Cakes', isVegetarian: true, tags: ['Highly Rated'] },
  { id: 'm33', restaurantId: '6', name: 'Cheesecake', description: 'Creamy New York style cheesecake.', price: 600, imageUrl: getImage('food-cheesecake').url, imageHint: getImage('food-cheesecake').hint, category: 'Cakes', isVegetarian: true },
  { id: 'm34', restaurantId: '6', name: 'Carrot Cake', description: 'Moist carrot cake with walnuts.', price: 580, imageUrl: getImage('food-carrot-cake').url, imageHint: getImage('food-carrot-cake').hint, category: 'Cakes', isVegetarian: true },
  { id: 'm35', restaurantId: '6', name: 'Macarons', description: 'Assortment of French macarons.', price: 350, imageUrl: getImage('food-macarons').url, imageHint: getImage('food-macarons').hint, category: 'Pastries', isVegetarian: true },
  { id: 'm36', restaurantId: '6', name: 'Croissant', description: 'Buttery and flaky croissant.', price: 150, imageUrl: getImage('food-croissant').url, imageHint: getImage('food-croissant').hint, category: 'Pastries', isVegetarian: true },
];

export const getRestaurantById = (id: string) => restaurants.find(r => r.id === id);
export const getMenuForRestaurant = (restaurantId: string) => menuItems.filter(m => m.restaurantId === restaurantId);
export const getRecommendedItems = () => [menuItems[0], menuItems[7], menuItems[12], menuItems[25]];
