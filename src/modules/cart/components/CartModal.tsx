import React from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../hooks/cart-hook';
import { useAuth } from '../../auth/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeItem, updateItemQuantity } = useCartStore();
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBuyNow = () => {
    console.log('handleBuyNow call ', user);
    if (!user) {
      alert('Please log in before making a purchase.');
      signInWithGoogle();
      return;
    }
    console.log('Now Navigate');
    navigate('/checkout');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded shadow-lg max-w-lg w-full"
      >
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <button
            onClick={handleBuyNow}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Buy Now
          </button>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default CartModal;
