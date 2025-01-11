import { Sneaker } from '../types';

export const mockReviews = [
  {
    id: 1,
    user: 'John D.',
    rating: 5,
    comment: 'Perfect fit and super comfortable. Highly recommend!',
    date: '2024-02-15'
  },
  {
    id: 2,
    user: 'Sarah M.',
    rating: 4,
    comment: 'Great shoes, just wish they had more color options.',
    date: '2024-02-10'
  },
  {
    id: 3,
    user: 'Mike R.',
    rating: 5,
    comment: "Best running shoes I've ever owned. Worth every penny!",
    date: '2024-02-05'
  }
];

export const relatedProducts: Array<{ id: string; name: string; price: number; rating: number; image: string }> = [
  {
    id: '2',
    name: 'Nike Air Zoom Pegasus',
    price: 129.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
  },
  {
    id: '3',
    name: 'Nike React Infinity',
    price: 149.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2'
  },
  {
    id: '4',
    name: 'Nike ZoomX Vaporfly',
    price: 199.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570'
  },
  {
    id: '5',
    name: 'Nike Air Max 270',
    price: 169.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782'
  }
];