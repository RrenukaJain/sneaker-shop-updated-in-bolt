import React, { useState, Suspense } from 'react';
import { Heart, ChevronLeft, ChevronRight, Star, Truck, RotateCcw, ShoppingCart } from 'lucide-react';

// Separate data into a different file to reduce initial bundle size
import { mockReviews, relatedProducts } from '../data/product-data';

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  const images = [
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&w=800&q=75",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&w=800&q=75",
    "https://images.unsplash.com/photo-1600185365778-7875a359b924?auto=format&w=800&q=75"
  ];

  const sizes = [6, 7, 8, 9, 10, 11, 12];

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Header with loading skeleton */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nike Air Max Pulse</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1">4.5</span>
          </div>
          <span>•</span>
          <span>128 reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Carousel with loading state */}
        <div className="relative group">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            {!imagesLoaded[currentImageIndex] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
              src={images[currentImageIndex]}
              alt={`Product view ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imagesLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(currentImageIndex)}
              loading="lazy"
            />
          </div>
          {/* Navigation buttons */}
          <button
            onClick={() => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentImageIndex ? 'bg-purple-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-3xl font-bold mb-2">$159.99</p>
                <p className="text-gray-600">The latest in comfort and style</p>
              </div>
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? 'border-purple-600 bg-purple-50 text-purple-600'
                        : 'border-gray-200 hover:border-purple-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Shipping Info */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <RotateCcw className="w-5 h-5" />
                <span>Free 30-day returns</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg" />}>
            <div className="border-t">
              <div className="flex gap-8 mt-8">
                {['description', 'reviews', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-b-2 border-purple-600 text-purple-600 font-semibold'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {/* Tab content components */}
                <TabContent activeTab={activeTab} />
              </div>
            </div>
          </Suspense>
        </div>
      </div>

      {/* Related Products */}
      <Suspense fallback={<RelatedProductsSkeleton />}>
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={`${product.image}?auto=format&w=400&q=75`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">${product.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

// Separate components for better code splitting
const TabContent = ({ activeTab }: { activeTab: string }) => {
  if (activeTab === 'description') {
    return (
      <div className="prose max-w-none">
        <p>
          The Nike Air Max Pulse brings revolutionary comfort to your everyday
          runs. Featuring Nike's latest cushioning technology, these sneakers
          offer exceptional support and responsiveness. The breathable mesh
          upper keeps your feet cool, while the durable rubber outsole
          provides excellent traction on various surfaces.
        </p>
        <ul className="mt-4 space-y-2">
          <li>Breathable mesh upper</li>
          <li>Responsive Air Max cushioning</li>
          <li>Durable rubber outsole</li>
          <li>Padded collar for comfort</li>
        </ul>
      </div>
    );
  }

  if (activeTab === 'reviews') {
    return (
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            <span className="text-xl font-semibold">4.5 out of 5</span>
          </div>
          <p className="text-gray-600">Based on 128 reviews</p>
        </div>

        <div className="space-y-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.user}</span>
              </div>
              <p className="text-gray-600 mb-2">{review.comment}</p>
              <p className="text-sm text-gray-400">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Shipping Information</h3>
        <p className="text-gray-600">
          We offer free standard shipping on all orders over $100. Standard
          shipping typically takes 3-5 business days. Express shipping is
          available for an additional fee.
        </p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Returns Policy</h3>
        <p className="text-gray-600">
          We offer a 30-day return policy for all unworn items in their
          original packaging. Return shipping is free for all US orders.
        </p>
      </div>
    </div>
  );
};

const RelatedProductsSkeleton = () => (
  <div className="mt-16">
    <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((key) => (
        <div key={key} className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

export default ProductDetail;