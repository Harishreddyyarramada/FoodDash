export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  ratingCount: string;
  location: string;
  imageUrl: string;
  imageHint: string;
  priceForTwo: string;
  deliveryTime: string;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: string;
};

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

export type OrderStatus = 'PLACED' | 'ACCEPTED' | 'PREPARING' | 'PICKED' | 'ON_THE_WAY' | 'DELIVERED';

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    address: string;
  };
  status: OrderStatus;
};
