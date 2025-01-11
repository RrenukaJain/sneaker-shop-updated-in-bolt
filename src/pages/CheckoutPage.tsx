import React, { useState } from 'react';
import { Lock, CreditCard, ShoppingCartIcon as PaypalLogo, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface CartItem {
  id: number;
  name: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Nike Air Max Pulse",
      size: 10,
      price: 159.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&w=200&q=75"
    }
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [saveAddress, setSaveAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success('Order placed successfully!');
      
      // Redirect to order confirmation
      navigate('/order-confirmation');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-8">
          {/* Delivery Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saveAddress"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="saveAddress" className="text-sm text-gray-600">
                  Save this address for future orders
                </label>
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 p-4 border rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                      : 'hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 p-4 border rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === 'paypal'
                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                      : 'hover:border-gray-300'
                  }`}
                >
                  <PaypalLogo className="w-5 h-5" />
                  <span>PayPal</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-4 pr-10 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                </form>
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center p-4">
                  <p className="text-gray-600">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                <Shield className="w-4 h-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
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
          </div>

          {/* Place Order Button */}
          <button 
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock className="w-5 h-5" />
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;