import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import AuthModal from './auth/AuthModal';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleNavigation = (path: string) => {
    if (!user) {
      toast.error('Please sign in to access this feature');
      setIsAuthModalOpen(true);
      return;
    }
    navigate(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/dashboard' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-gray-900">SneakerSpot</span>
              </Link>
              
              <div className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium ${
                      location.pathname === link.path
                        ? 'text-purple-600'
                        : 'text-gray-700 hover:text-purple-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sneakers..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleNavigation('/wishlist')}
                className="text-gray-600 hover:text-gray-900 relative"
                aria-label="Wishlist"
              >
                <Heart className="h-6 w-6" />
              </button>
              
              <button 
                onClick={() => handleNavigation('/cart')}
                className="text-gray-600 hover:text-gray-900 relative"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
              </button>

              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="text-sm text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    {user.email}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900"
                    aria-label="Logout"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-600 hover:text-gray-900"
                  aria-label="Sign In"
                >
                  <User className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}