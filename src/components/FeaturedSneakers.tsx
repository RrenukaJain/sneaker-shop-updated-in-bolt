import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { slugify } from '../utils/slugify';

// Use the actual UUID from our Supabase products table
const featuredSneakers = [
  // e6b9a2f0-9ab3-4f83-bdaa-27fdf8b19ed3
  {
    id: 'e6b9a2f0-9ab3-4f83-bdaa-27fdf8b19ed3', // UUID from Supabase products table
    name: 'Air Max Pulse',
    brand: 'Nike',
    price: 159.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&q=75&w=600'],
    description: 'The latest in comfort and style',
    rating: 4.5,
    reviews: 128
  },
  
];

export default function FeaturedSneakers() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  const handleProductClick = (brand: string, name: string) => {
    navigate(`/product/${slugify(brand)}/${slugify(name)}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Sneakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSneakers.map((sneaker) => (
            <div key={sneaker.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div 
                onClick={() => handleProductClick(sneaker.brand, sneaker.name)}
                className="aspect-w-16 aspect-h-9 bg-gray-200 cursor-pointer"
              >
                <img
                  src={sneaker.images[0]}
                  alt={`${sneaker.brand} ${sneaker.name} - ${sneaker.description}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{sneaker.brand}</p>
                    <h3 
                      className="text-xl font-semibold text-gray-900 mt-1 cursor-pointer hover:text-purple-600"
                      onClick={() => handleProductClick(sneaker.brand, sneaker.name)}
                    >
                      {sneaker.name}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{sneaker.rating}</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{sneaker.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${sneaker.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(sneaker.id);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}