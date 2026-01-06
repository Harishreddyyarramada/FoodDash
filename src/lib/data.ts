import type { Restaurant, MenuItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: '', hint: '' };
};

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Pizza Palace',
    cuisine: 'Italian',
    rating: 4.5,
    location: '123 Main St, Anytown',
    imageUrl: getImage('restaurant-1').url,
    imageHint: getImage('restaurant-1').hint,
  },
  {
    id: '2',
    name: 'Sushi Sensation',
    cuisine: 'Japanese',
    rating: 4.8,
    location: '456 Oak Ave, Anytown',
    imageUrl: getImage('restaurant-2').url,
    imageHint: getImage('restaurant-2').hint,
  },
  {
    id: '3',
    name: 'Burger Bonanza',
    cuisine: 'American',
    rating: 4.2,
    location: '789 Pine Ln, Anytown',
    imageUrl: getImage('restaurant-3').url,
    imageHint: getImage('restaurant-3').hint,
  },
  {
    id: '4',
    name: 'Green Goodness',
    cuisine: 'Healthy',
    rating: 4.9,
    location: '101 Maple Dr, Anytown',
    imageUrl: getImage('restaurant-4').url,
    imageHint: getImage('restaurant-4').hint,
  },
   {
    id: '5',
    name: 'Biryani House',
    cuisine: 'Indian',
    rating: 4.6,
    location: '202 Elm St, Anytown',
    imageUrl: getImage('restaurant-5').url,
    imageHint: getImage('restaurant-5').hint,
  },
  {
    id: '6',
    name: 'Cake Corner',
    cuisine: 'Desserts',
    rating: 4.7,
    location: '303 Birch Rd, Anytown',
    imageUrl: getImage('restaurant-6').url,
    imageHint: getImage('restaurant-6').hint,
  },
];

export const menuItems: MenuItem[] = [
  // Pizza Palace
  {
    id: 'm1',
    restaurantId: '1',
    name: 'Margherita Pizza',
    description: 'Classic cheese and tomato pizza with fresh basil.',
    price: 12.99,
    imageUrl: getImage('food-pizza-margherita').url,
    imageHint: getImage('food-pizza-margherita').hint,
    category: 'Pizza'
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni and mozzarella cheese.',
    price: 14.99,
    imageUrl: getImage('food-pizza-pepperoni').url,
    imageHint: getImage('food-pizza-pepperoni').hint,
    category: 'Pizza'
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon and parmesan.',
    price: 15.99,
    imageUrl: getImage('food-pasta-carbonara').url,
    imageHint: getImage('food-pasta-carbonara').hint,
    category: 'Non-Veg'
  },
  // Sushi Sensation
  {
    id: 'm4',
    restaurantId: '2',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber rolled in sushi rice.',
    price: 8.99,
    imageUrl: getImage('food-sushi-california').url,
    imageHint: getImage('food-sushi-california').hint,
    category: 'Non-Veg'
  },
  {
    id: 'm5',
    restaurantId: '2',
    name: 'Salmon Nigiri',
    description: 'Fresh salmon slices over pressed vinegar rice.',
    price: 10.99,
    imageUrl: getImage('food-sushi-salmon').url,
    imageHint: getImage('food-sushi-salmon').hint,
    category: 'Non-Veg'
  },
  // Burger Bonanza
  {
    id: 'm6',
    restaurantId: '3',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheese, lettuce, and tomato.',
    price: 11.99,
    imageUrl: getImage('food-burger-classic').url,
    imageHint: getImage('food-burger-classic').hint,
    category: 'Non-Veg'
  },
  {
    id: 'm7',
    restaurantId: '3',
    name: 'Veggie Burger',
    description: 'A delicious plant-based patty with all the fixings.',
    price: 10.99,
    imageUrl: getImage('food-burger-veggie').url,
    imageHint: getImage('food-burger-veggie').hint,
    category: 'Veg'
  },
  // Green Goodness
  {
    id: 'm8',
    restaurantId: '4',
    name: 'Caesar Salad',
    description: 'Crisp romaine, croutons, and parmesan with Caesar dressing.',
    price: 9.99,
    imageUrl: getImage('food-salad-caesar').url,
    imageHint: getImage('food-salad-caesar').hint,
    category: 'Veg'
  },
  {
    id: 'm9',
    restaurantId: '4',
    name: 'Greek Salad',
    description: 'Tomatoes, cucumbers, olives, and feta cheese.',
    price: 10.99,
    imageUrl: getImage('food-salad-greek').url,
    imageHint: getImage('food-salad-greek').hint,
    category: 'Veg'
  },
    // Biryani House
  {
    id: 'm10',
    restaurantId: '5',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken and spices.',
    price: 16.99,
    imageUrl: getImage('food-biryani-chicken').url,
    imageHint: getImage('food-biryani-chicken').hint,
    category: 'Biryani'
  },
  {
    id: 'm11',
    restaurantId: '5',
    name: 'Vegetable Biryani',
    description: 'Aromatic basmati rice with mixed vegetables and spices.',
    price: 14.99,
    imageUrl: getImage('food-biryani-veg').url,
    imageHint: getImage('food-biryani-veg').hint,
    category: 'Biryani'
  },
  // Cake Corner
  {
    id: 'm12',
    restaurantId: '6',
    name: 'Chocolate Truffle Cake',
    description: 'Rich and decadent chocolate cake.',
    price: 7.99,
    imageUrl: getImage('food-cake-chocolate').url,
    imageHint: getImage('food-cake-chocolate').hint,
    category: 'Cake'
  },
  {
    id: 'm13',
    restaurantId: '6',
    name: 'Red Velvet Cake',
    description: 'Classic red velvet with cream cheese frosting.',
    price: 8.50,
    imageUrl: getImage('food-cake-red-velvet').url,
    imageHint: getImage('food-cake-red-velvet').hint,
    category: 'Cake'
  },
];

export const getRestaurantById = (id: string) => restaurants.find(r => r.id === id);
export const getMenuForRestaurant = (restaurantId: string) => menuItems.filter(m => m.restaurantId === restaurantId);
export const getRecommendedItems = () => [menuItems[9], menuItems[11], menuItems[0], menuItems[6]];
