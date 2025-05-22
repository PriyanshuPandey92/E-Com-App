

import { CartItem } from '../types/cart-item';
import * as cartService from '../services/cart-service';
import {create} from 'zustand';





interface CartState {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  // Initialize state from your cart service (e.g., localStorage)
  cartItems: cartService.getCartItems(),
  addItem: (item: CartItem) => {
    // Call your service to update the cart and get the updated cart
    const updatedCart = cartService.addCartItem(item);
    // Update the global state
    set({ cartItems: updatedCart });
  },
  removeItem: (id: number) => {
    const updatedCart = cartService.removeCartItem(id);
    set({ cartItems: updatedCart });
  },
  updateItemQuantity: (id: number, quantity: number) => {
    const updatedCart = cartService.updateCartItemQuantity(id, quantity);
    set({ cartItems: updatedCart });
  },
}));