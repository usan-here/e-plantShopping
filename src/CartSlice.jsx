import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // If item exists, increase quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Else, add new item with quantity 1
      }
    },

    // Remove item from cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },

    // Update quantity of a specific item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity; // Set new quantity
      }
    },
  },
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer for store.js
export default CartSlice.reducer;
