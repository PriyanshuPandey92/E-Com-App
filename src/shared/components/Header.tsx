
import { Link } from 'react-router-dom';
import { useCartStore } from '../../modules/cart';
import { useState } from 'react';
import CartModal from '@/modules/cart/components/CartModal';

const Header= () => {
  // Use the cart hook to access cart items
  const { cartItems } = useCartStore();

  // Calculate the total count from the items (summing quantities)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // State to toggle the cart modal
  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };
  return (
    <>
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold text-gray-900">My E-commerce</h1>
        </Link>
        <nav className="flex items-center gap-6">
            <button
              onClick={handleCartClick}
              className="relative inline-block focus:outline-none"
            >
              <span className="text-lg">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
      </div>
    </header>
    {/* Render the CartModal */}
    <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Header;