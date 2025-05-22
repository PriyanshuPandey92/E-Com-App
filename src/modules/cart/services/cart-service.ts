// src/modules/cart/services/cartService.ts
import { CartItem } from '../types/cart-item';

// Example: Using localStorage to persist cart data
const CART_STORAGE_KEY = 'cart_items';

export const getCartItems = (): CartItem[] => {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCartItems = (items: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const addCartItem = (item: CartItem): CartItem[] => {
  const cart = getCartItems();
  const existing = cart.find((ci) => ci.id === item.id);
  if (existing) {
    // Increase quantity if item exists
    const updatedCart = cart.map((ci) =>
      ci.id === item.id ? { ...ci, quantity: ci.quantity + item.quantity } : ci
    );
    saveCartItems(updatedCart);
    return updatedCart;
  } else {
    const updatedCart = [...cart, item];
    saveCartItems(updatedCart);
    return updatedCart;
  }
};

export const removeCartItem = (id: number): CartItem[] => {
  const cart = getCartItems();
  const updatedCart = cart.filter((item) => item.id !== id);
  saveCartItems(updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = (id: number, quantity: number): CartItem[] => {
  const cart = getCartItems();
  const updatedCart = cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  saveCartItems(updatedCart);
  return updatedCart;
};