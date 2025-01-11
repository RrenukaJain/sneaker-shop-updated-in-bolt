import React from 'react';
import { Package2, Truck, MapPin } from 'lucide-react';

const OrderConfirmation = () => {
  // In a real app, these would come from your order state/API
  const orderDetails = {
    orderId: "SP" + Math.random().toString().slice(2, 8),
    orderDate: new Date().toLocaleDateString(),
    trackingNumber: "TRK" + Math.random().toString().slice(2, 10),
    items: [
      {
        name: "Nike Air Max Pulse",
        size: 10,
        quantity: 1,
        price: 159.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3"
      }
    ],
    shippingAddress: {
      street: "123 Sneaker Street",
      city: "Footwear City",
      zipCode: "12345"
    },
    total: 172.79
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package2 className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your purchase!</h1>
          <p className="text-gray-600">Order #{orderDetails.orderId}</p>
          <p className="text-sm text-gray-500">Placed on {orderDetails.orderDate}</p>
        </div>

        {/* Order Status */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Truck className="text-purple-600 w-5 h-5" />
              <div>
                <h2 className="text-lg font-semibold">Shipping Status</h2>
                <p className="text-sm text-gray-600">Your order is being processed</p>
              </div>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
              Track Order
            </button>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">Tracking Number: {orderDetails.trackingNumber}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${item.price}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>${orderDetails.items[0].price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax</span>
              <span>$12.80</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${orderDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="text-purple-600 w-5 h-5" />
            <h2 className="text-lg font-semibold">Shipping Address</h2>
          </div>
          <address className="text-gray-600 not-italic">
            {orderDetails.shippingAddress.street}<br />
            {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.zipCode}
          </address>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;