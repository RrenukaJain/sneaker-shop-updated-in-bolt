import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FeaturedSneakers from '../components/FeaturedSneakers';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { ArrowRight, Sparkles, Star, Clock, ChevronRight, ChevronLeft } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleShopNow = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      toast.error('Please sign in to access the shop');
    }
  };

  const categories = [
    { id: 1, name: 'Sports', count: 124 },
    { id: 2, name: 'Casual', count: 89 },
    { id: 3, name: 'Luxury', count: 45 },
    { id: 4, name: 'Limited Edition', count: 32 },
    { id: 5, name: 'Basketball', count: 67 },
    { id: 6, name: 'Running', count: 93 },
  ];

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('categories-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="py-20 text-center bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-3xl my-8 animate-gradient shadow-xl">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
              {user ? `Welcome Back, ${user.email?.split('@')[0]}!` : 'Step into Greatness'}
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Discover exclusive sneakers, limited editions, and the latest drops from top brands.
            </p>
            <div className="max-w-xl mx-auto px-4 mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for your perfect pair..."
                  className="w-full px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all duration-300">
                  Search
                </button>
              </div>
            </div>
            <button 
              onClick={handleShopNow}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center mx-auto hover-float shadow-lg"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </section>

          {/* Categories Section - Only visible to logged-in users */}
          {user && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => scrollCategories('left')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => scrollCategories('right')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div 
                id="categories-container"
                className="flex overflow-x-auto hide-scrollbar gap-4 pb-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex-none w-64 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} items</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Promotional Section - Different content for logged-in users */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {user ? (
                // Personalized content for logged-in users
                <>
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <Star className="h-6 w-6 mr-2" />
                      <h3 className="text-xl font-bold">Your Favorites</h3>
                    </div>
                    <p className="text-pink-100">View your liked items</p>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <Clock className="h-6 w-6 mr-2" />
                      <h3 className="text-xl font-bold">Recent Views</h3>
                    </div>
                    <p className="text-orange-100">Continue browsing</p>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-8 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-6 w-6 mr-2" />
                      <h3 className="text-xl font-bold">For You</h3>
                    </div>
                    <p className="text-green-100">Personalized picks</p>
                  </div>
                </>
              ) : (
                // Default content for non-logged-in users
                <>
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-6 w-6 mr-2" />
                      <h3 className="text-xl font-bold">New Arrivals</h3>
                    </div>
                    <p className="text-pink-100">Fresh drops added weekly</p>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <Star className="h-6 w-6 mr-2" />
                      <h3 className="text-xl font-bold">Limited Edition</h3>
                    </div>
                    <p className="text-orange-100">Exclusive collections</p>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-8 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <Clock className="h-6 w-6 mr-2" />
                      <h3 className="text-xl font-bold">Member Rewards</h3>
                    </div>
                    <p className="text-green-100">Special offers for members</p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Featured Sneakers - Show personalized recommendations for logged-in users */}
          <FeaturedSneakers />
        </div>
      </main>
      <Footer />
    </>
  );
}