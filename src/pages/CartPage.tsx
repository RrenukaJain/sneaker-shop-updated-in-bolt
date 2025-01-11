import React from 'react';
import { Minus, Plus, X, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, loading } = useCart();
  const [promoCode, setPromoCode] = React.useState('');

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  const subtotal = cartItems.reduce((sum, item) => 
    sum + item.product.price * item.quantity, 0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some awesome sneakers to your cart!</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product_id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
              <img
                src={item.product.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&q=75&w=200'}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-md"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">Size: {item.size || 'Standard'}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product_id)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Remove item"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          {/* Promo Code */}
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                Apply
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-gray-600 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="h-px bg-gray-200 my-4" />
            <div className="flex justify-between text-black font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
            onClick={handleProceedToCheckout}
            className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;