import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, CartItem } from '../lib/api';
import toast from 'react-hot-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const items = await api.getCart();
      setCartItems(items);
    } catch (error: any) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const item = await api.addToCart(productId, quantity);
      setCartItems(prev => {
        const exists = prev.find(i => i.product_id === productId);
        if (exists) {
          return prev.map(i => i.product_id === productId ? item : i);
        }
        return [...prev, item];
      });

      toast.success(
        <div>
          Product added to cart!{' '}
          <button 
            className="text-purple-600 font-semibold"
            onClick={() => navigate('/cart')}
          >
            View Cart
          </button>
        </div>
      );
    } catch (error: any) {
      toast.error('Failed to add to cart');
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await api.removeFromCart(productId);
      setCartItems(prev => prev.filter(item => item.product_id !== productId));
      toast.success('Item removed from cart');
    } catch (error: any) {
      toast.error('Failed to remove item');
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      const item = await api.updateCartQuantity(productId, quantity);
      setCartItems(prev => 
        prev.map(i => i.product_id === productId ? item : i)
      );
    } catch (error: any) {
      toast.error('Failed to update quantity');
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await Promise.all(cartItems.map(item => api.removeFromCart(item.product_id)));
      setCartItems([]);
    } catch (error: any) {
      toast.error('Failed to clear cart');
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}