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
  { id: 'm1', restaurantId: '1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: getImage('food-pizza-margherita').url, imageHint: getImage('food-pizza-margherita').hint, category: 'Pizza' },
  { id: 'm2', restaurantId: '1', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and cheese.', price: 14.99, imageUrl: getImage('food-pizza-pepperoni').url, imageHint: getImage('food-pizza-pepperoni').hint, category: 'Pizza' },
  { id: 'm3', restaurantId: '1', name: 'Veggie Supreme Pizza', description: 'Onions, peppers, olives, mushrooms.', price: 15.99, imageUrl: "https://picsum.photos/seed/pizzaveg/600/400", imageHint: 'veggie pizza', category: 'Pizza' },
  { id: 'm4', restaurantId: '1', name: 'BBQ Chicken Pizza', description: 'BBQ sauce, chicken, and red onions.', price: 16.99, imageUrl: "https://picsum.photos/seed/pizzabbq/600/400", imageHint: 'bbq pizza', category: 'Pizza' },
  { id: 'm5', restaurantId: '1', name: 'Pasta Carbonara', description: 'Creamy pasta with bacon.', price: 15.99, imageUrl: getImage('food-pasta-carbonara').url, imageHint: getImage('food-pasta-carbonara').hint, category: 'Pasta' },
  { id: 'm6', restaurantId: '1', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 6.99, imageUrl: "https://picsum.photos/seed/garlicbread/600/400", imageHint: 'garlic bread', category: 'Sides' },

  // Sushi Sensation
  { id: 'm7', restaurantId: '2', name: 'California Roll', description: 'Crab, avocado, and cucumber.', price: 8.99, imageUrl: getImage('food-sushi-california').url, imageHint: getImage('food-sushi-california').hint, category: 'Sushi' },
  { id: 'm8', restaurantId: '2', name: 'Salmon Nigiri', description: 'Fresh salmon over pressed rice.', price: 10.99, imageUrl: getImage('food-sushi-salmon').url, imageHint: getImage('food-sushi-salmon').hint, category: 'Sushi' },
  { id: 'm9', restaurantId: '2', name: 'Spicy Tuna Roll', description: 'Tuna with spicy mayo.', price: 9.99, imageUrl: "https://picsum.photos/seed/sushituna/600/400", imageHint: 'tuna roll', category: 'Sushi' },
  { id: 'm10', restaurantId: '2', name: 'Dragon Roll', description: 'Eel, crab, cucumber, and avocado.', price: 14.99, imageUrl: "https://picsum.photos/seed/sushidragon/600/400", imageHint: 'dragon roll', category: 'Sushi' },
  { id: 'm11', restaurantId: '2', name: 'Miso Soup', description: 'Traditional Japanese soup.', price: 3.99, imageUrl: "https://picsum.photos/seed/misosoup/600/400", imageHint: 'miso soup', category: 'Sides' },
  { id: 'm12', restaurantId: '2', name: 'Edamame', description: 'Steamed and salted soybeans.', price: 5.99, imageUrl: "https://picsum.photos/seed/edamame/600/400", imageHint: 'edamame beans', category: 'Sides' },

  // Burger Bonanza
  { id: 'm13', restaurantId: '3', name: 'Classic Cheeseburger', description: 'Beef patty, cheese, lettuce, tomato.', price: 11.99, imageUrl: getImage('food-burger-classic').url, imageHint: getImage('food-burger-classic').hint, category: 'Burgers' },
  { id: 'm14', restaurantId: '3', name: 'Veggie Burger', description: 'Plant-based patty with all fixings.', price: 10.99, imageUrl: getImage('food-burger-veggie').url, imageHint: getImage('food-burger-veggie').hint, category: 'Burgers' },
  { id: 'm15', restaurantId: '3', name: 'Bacon Deluxe Burger', description: 'Beef patty, bacon, cheese, and special sauce.', price: 13.99, imageUrl: "https://picsum.photos/seed/burgerbacon/600/400", imageHint: 'bacon burger', category: 'Burgers' },
  { id: 'm16', restaurantId: '3', name: 'Spicy Chicken Burger', description: 'Crispy chicken with a spicy kick.', price: 12.99, imageUrl: "https://picsum.photos/seed/burgerchicken/600/400", imageHint: 'chicken burger', category: 'Burgers' },
  { id: 'm17', restaurantId: '3', name: 'French Fries', description: 'Golden crispy french fries.', price: 4.99, imageUrl: "https://picsum.photos/seed/fries/600/400", imageHint: 'french fries', category: 'Sides' },
  { id: 'm18', restaurantId: '3', name: 'Onion Rings', description: 'Battered and fried onion rings.', price: 5.99, imageUrl: "https://picsum.photos/seed/onionrings/600/400", imageHint: 'onion rings', category: 'Sides' },

  // Green Goodness
  { id: 'm19', restaurantId: '4', name: 'Caesar Salad', description: 'Romaine, croutons, parmesan, Caesar dressing.', price: 9.99, imageUrl: getImage('food-salad-caesar').url, imageHint: getImage('food-salad-caesar').hint, category: 'Salads' },
  { id: 'm20', restaurantId: '4', name: 'Greek Salad', description: 'Tomatoes, cucumbers, olives, feta.', price: 10.99, imageUrl: getImage('food-salad-greek').url, imageHint: getImage('food-salad-greek').hint, category: 'Salads' },
  { id: 'm21', restaurantId: '4', name: 'Quinoa Bowl', description: 'Quinoa with roasted vegetables and lemon vinaigrette.', price: 12.99, imageUrl: "https://picsum.photos/seed/quinoabowl/600/400", imageHint: 'quinoa bowl', category: 'Bowls' },
  { id: 'm22', restaurantId: '4', name: 'Avocado Toast', description: 'Smashed avocado on whole-grain toast.', price: 8.99, imageUrl: "https://picsum.photos/seed/avocadotoast/600/400", imageHint: 'avocado toast', category: 'Breakfast' },
  { id: 'm23', restaurantId: '4', name: 'Green Smoothie', description: 'Spinach, kale, banana, and almond milk.', price: 7.99, imageUrl: "https://picsum.photos/seed/greensmoothie/600/400", imageHint: 'green smoothie', category: 'Drinks' },
  { id: 'm24', restaurantId: '4', name: 'Berry Smoothie', description: 'Mixed berries, yogurt, and honey.', price: 7.99, imageUrl: "https://picsum.photos/seed/berrysmoothie/600/400", imageHint: 'berry smoothie', category: 'Drinks' },

  // Biryani House
  { id: 'm25', restaurantId: '5', name: 'Chicken Biryani', description: 'Aromatic basmati rice with chicken.', price: 16.99, imageUrl: getImage('food-biryani-chicken').url, imageHint: getImage('food-biryani-chicken').hint, category: 'Biryani' },
  { id: 'm26', restaurantId: '5', name: 'Vegetable Biryani', description: 'Aromatic basmati rice with vegetables.', price: 14.99, imageUrl: getImage('food-biryani-veg').url, imageHint: getImage('food-biryani-veg').hint, category: 'Biryani' },
  { id: 'm27', restaurantId: '5', name: 'Mutton Biryani', description: 'Tender mutton cooked with fragrant rice.', price: 18.99, imageUrl: "https://picsum.photos/seed/biryanimutton/600/400", imageHint: 'mutton biryani', category: 'Biryani' },
  { id: 'm28', restaurantId: '5', name: 'Fish Biryani', description: 'Flaky fish pieces in a spicy rice masala.', price: 17.99, imageUrl: "https://picsum.photos/seed/biryanifish/600/400", imageHint: 'fish biryani', category: 'Biryani' },
  { id: 'm29', restaurantId: '5', name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes.', price: 5.99, imageUrl: "https://picsum.photos/seed/samosa/600/400", imageHint: 'potato samosa', category: 'Appetizers' },
  { id: 'm30', restaurantId: '5', name: 'Gulab Jamun', description: 'Sweet milk solids-based dessert.', price: 6.99, imageUrl: "https://picsum.photos/seed/gulabjamun/600/400", imageHint: 'gulab jamun', category: 'Desserts' },

  // Cake Corner
  { id: 'm31', restaurantId: '6', name: 'Chocolate Truffle Cake', description: 'Rich and decadent chocolate cake.', price: 7.99, imageUrl: getImage('food-cake-chocolate').url, imageHint: getImage('food-cake-chocolate').hint, category: 'Cakes' },
  { id: 'm32', restaurantId: '6', name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese.', price: 8.50, imageUrl: getImage('food-cake-red-velvet').url, imageHint: getImage('food-cake-red-velvet').hint, category: 'Cakes' },
  { id: 'm33', restaurantId: '6', name: 'Cheesecake', description: 'Creamy New York style cheesecake.', price: 9.99, imageUrl: "https://picsum.photos/seed/cheesecake/600/400", imageHint: 'newyork cheesecake', category: 'Cakes' },
  { id: 'm34', restaurantId: '6', name: 'Carrot Cake', description: 'Moist carrot cake with walnuts.', price: 8.99, imageUrl: "https://picsum.photos/seed/carrotcake/600/400", imageHint: 'carrot cake', category: 'Cakes' },
  { id: 'm35', restaurantId: '6', 'name': 'Macarons', 'description': 'Assortment of French macarons.', price: 10.99, imageUrl: "https://picsum.photos/seed/macarons/600/400", imageHint: 'french macarons', category: 'Pastries' },
  { id: 'm36', restaurantId: '6', 'name': 'Croissant', 'description': 'Buttery and flaky croissant.', price: 4.50, imageUrl: "https://picsum.photos/seed/croissant/600/400", imageHint: 'flaky croissant', category: 'Pastries' },
];

export const getRestaurantById = (id: string) => restaurants.find(r => r.id === id);
export const getMenuForRestaurant = (restaurantId: string) => menuItems.filter(m => m.restaurantId === restaurantId);
export const getRecommendedItems = () => [menuItems[0], menuItems[7], menuItems[12], menuItems[25]];
