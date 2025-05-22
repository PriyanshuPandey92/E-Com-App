// src/modules/cart/components/Cart.tsx

import { useCartStore } from '../hooks/cart-hook';
import { CartItem } from '../types/cart-item';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeItem, updateItemQuantity } = useCartStore();

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(item.id, newQuantity);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item, item.quantity - 1)
                  }
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item, item.quantity + 1)
                  }
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-2 py-1 border rounded bg-red-500 text-white"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Cart;