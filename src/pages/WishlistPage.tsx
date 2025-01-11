import React, { useState } from 'react';
import { ShoppingCart, Bell, AlertTriangle } from 'lucide-react';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  stock: number;
  brand: string;
}

const WishlistPage = () => {
  const [wishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Nike Air Max Pulse",
      price: 139.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&w=400&q=75",
      stock: 3,
      brand: "Nike"
    },
    {
      id: 2,
      name: "Ultra Boost",
      price: 179.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&w=400&q=75",
      stock: 8,
      brand: "Adidas"
    }
  ]);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-8">Start adding your favorite sneakers!</p>
        <button 
          onClick={() => window.history.back()}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Browse Sneakers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {/* Notifications */}
      <div className="mb-8 space-y-3">
        {wishlistItems.map(item => {
          const hasPriceDrop = item.price < item.originalPrice;
          const hasLowStock = item.stock <= 5;
          
          if (!hasPriceDrop && !hasLowStock) return null;
          
          return (
            <div 
              key={`notification-${item.id}`}
              className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm"
            >
              <Bell className={`w-5 h-5 ${hasPriceDrop ? 'text-green-500' : 'text-orange-500'}`} />
              <div>
                {hasPriceDrop && (
                  <p className="text-green-700">
                    Price dropped on {item.name}! Save ${(item.originalPrice - item.price).toFixed(2)}
                  </p>
                )}
                {hasLowStock && (
                  <p className="text-orange-700">
                    Only {item.stock} pairs left of {item.name}!
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div className="aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <div className="mb-2">
                <p className="text-sm text-gray-600">{item.brand}</p>
                <h3 className="font-semibold">{item.name}</h3>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-bold text-lg">${item.price}</p>
                  {item.price < item.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      ${item.originalPrice}
                    </p>
                  )}
                </div>
                {item.stock <= 5 && (
                  <div className="flex items-center gap-1 text-orange-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Low Stock</span>
                  </div>
                )}
              </div>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;