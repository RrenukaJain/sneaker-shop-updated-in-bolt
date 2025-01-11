import React, { useState } from 'react';
import { User, Package, MapPin, CreditCard, Gift, LogOut, Edit2, Trash2, Plus, ChevronRight } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'in-transit' | 'processing';
  total: number;
  items: { name: string; quantity: number }[];
}

interface Address {
  id: number;
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: number;
  type: 'credit' | 'debit';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    loyaltyPoints: 450
  });

  const [orders] = useState<Order[]>([
    {
      id: 'ORD-123',
      date: '2024-02-20',
      status: 'delivered',
      total: 159.99,
      items: [{ name: 'Nike Air Max Pulse', quantity: 1 }]
    }
  ]);

  const [addresses] = useState<Address[]>([
    {
      id: 1,
      type: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      isDefault: true
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: 'credit',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    }
  ]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'loyalty', label: 'Loyalty Points', icon: Gift }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'in-transit': return 'text-blue-600';
      case 'processing': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-50 text-purple-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Personal Info */}
            {activeTab === 'personal' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Order History */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Order History</h2>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`${getStatusColor(order.status)} capitalize`}>
                          {order.status}
                        </span>
                      </div>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                        </div>
                      ))}
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <span className="font-semibold">Total: ${order.total}</span>
                        <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>
                <div className="space-y-4">
                  {addresses.map(address => (
                    <div key={address.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{address.type}</span>
                            {address.isDefault && (
                              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{address.street}</p>
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.zip}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full border-2 border-dashed rounded-lg p-4 text-gray-500 hover:text-purple-600 hover:border-purple-600 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Address
                  </button>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payments' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
                <div className="space-y-4">
                  {paymentMethods.map(method => (
                    <div key={method.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold capitalize">
                              {method.type} Card
                            </span>
                            {method.isDefault && (
                              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">•••• {method.last4}</p>
                          <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full border-2 border-dashed rounded-lg p-4 text-gray-500 hover:text-purple-600 hover:border-purple-600 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Payment Method
                  </button>
                </div>
              </div>
            )}

            {/* Loyalty Points */}
            {activeTab === 'loyalty' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Loyalty Points</h2>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white mb-8">
                  <p className="text-lg mb-2">Available Points</p>
                  <p className="text-4xl font-bold">{user.loyaltyPoints}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Available Rewards</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">$10 Off</p>
                          <p className="text-sm text-gray-600">Valid on any purchase</p>
                        </div>
                        <span className="text-purple-600 font-semibold">500 pts</span>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={user.loyaltyPoints < 500}>
                        Redeem
                      </button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Free Shipping</p>
                          <p className="text-sm text-gray-600">On your next order</p>
                        </div>
                        <span className="text-purple-600 font-semibold">300 pts</span>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={user.loyaltyPoints < 300}>
                        Redeem
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;