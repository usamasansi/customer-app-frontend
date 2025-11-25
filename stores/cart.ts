// stores/cart.ts
import { defineStore } from 'pinia'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image_url?: string
  restaurant_id?: number
  menu_id?: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    totalQuantity: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
  },

  actions: {
    addToCart(item: any, qty = 1) {
      const existing = this.items.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += qty
      } else {
        this.items.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image_url: item.image_url,
          quantity: qty,
          restaurant_id: item.restaurant_id,
          menu_id: item.menu_id,
        })
      }
    },

    removeFromCart(id: number) {
      this.items = this.items.filter((item) => item.id !== id)
    },

    clearCart() {
      this.items = []
    },
  },
})
