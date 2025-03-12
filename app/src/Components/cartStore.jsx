import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart: (product, size, color) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item._id === product._id &&
          item.size === size &&
          item.color === color
      );
      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart = [...state.cart, { ...product, size, color, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeFromCart: (productId, size, color) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (item) =>
          !(item._id === productId && item.size === size && item.color === color)
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
updateQuantity: (productId, size, color, change) =>
  set((state) => {
    const updatedCart = state.cart.map((item) =>
      item._id === productId && item.size === size && item.color === color
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },

  loadCartFromLocalStorage: () =>
    set({ cart: JSON.parse(localStorage.getItem("cart")) || [] }),
}));
