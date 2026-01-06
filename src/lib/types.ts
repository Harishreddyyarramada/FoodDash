export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  location: string;
  imageUrl: string;
  imageHint: string;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
};

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    address: string;
  };
  status: 'Order Placed' | 'Preparing Food' | 'Out for Delivery' | 'Delivered';
};
