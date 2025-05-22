import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/use-auth';
import { useNavigate } from 'react-router-dom';




interface Order {
  id: string;
  items: { title: string; price: number; quantity: number; image: string }[];
  totalAmount: number;
  date: string;
}

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user === undefined) return; // Wait for auth state to initialize
    if (!user) {
      navigate('/login');
      return;
    }

    const storedOrders = JSON.parse(localStorage.getItem(`orders_${user?.uid}`) || '[]');
    setOrders(storedOrders);
  }, [user, navigate]);

  if (user === undefined) {
    return <p className="text-center mt-10 text-lg">Loading...</p>; 
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <p className="text-lg mb-4">Welcome, <span className="font-semibold">{user?.displayName || 'User'}</span>! Here are your past orders.</p>
      {orders.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">No orders found.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded">
              <p className="font-semibold">Order ID: {order.id}</p>
              <p>Date: {order.date}</p>
              <p>Total: ${order.totalAmount.toFixed(2)}</p>
              <ul className="mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 border-b py-2">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p>${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <div className="text-center mt-6">
        <button 
          onClick={() => navigate('/')} 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
