import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false,
  },
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1, size, color } = action.payload
      const existing = state.items.find(
        (i) => i.id === product.id && i.size === size && i.color === color
      )
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ ...product, quantity, size, color })
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i, idx) => idx !== action.payload)
    },
    updateQuantity(state, action) {
      const { index, quantity } = action.payload
      if (quantity <= 0) {
        state.items.splice(index, 1)
      } else {
        state.items[index].quantity = quantity
      }
    },
    clearCart(state) {
      state.items = []
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
    closeCart(state) {
      state.isOpen = false
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, closeCart } = cartSlice.actions
export default cartSlice.reducer
