import React, { useState } from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';
import { Sneaker } from '../../types';
import { useCart } from '../../context/CartContext';

interface QuickViewModalProps {
  sneaker: Sneaker | null;
  onClose: () => void;
}

export default function QuickViewModal({ sneaker, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { addToCart } = useCart();

  if (!sneaker) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    addToCart(sneaker, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div>
            <img
              src={sneaker.images[0]}
              alt={sneaker.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">{sneaker.brand}</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{sneaker.name}</h2>
            
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {sneaker.rating} ({sneaker.reviews} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-6">{sneaker.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Select Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {sneaker.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-2 border rounded-md hover:border-purple-600 hover:text-purple-600 ${
                      selectedSize === size
                        ? 'border-purple-600 bg-purple-50 text-purple-600'
                        : ''
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-red-500 mt-2">Please select a size</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">
                ${sneaker.price}
              </span>
              <button 
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}