export interface Sneaker {
  id: string;
  name: string;
  brand: string;
  price: number;
  sizes: number[];
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  colors: Array<{
    name: string;
    hex: string;
  }>;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  stockCount?: number;
}

export interface CartItem {
  sneaker: Sneaker;
  size: number;
  quantity: number;
}

export interface Filters {
  brands: string[];
  sizes: number[];
  priceRange: string;
}