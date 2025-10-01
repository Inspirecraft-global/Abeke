import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  items: [], // {id, title, price, image, qty}
};

export const useCartStore = create()(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + quantity } : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                qty: quantity,
              },
            ],
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQty: (id, qty) => {
        if (qty <= 0) return;
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },

      clear: () => set({ items: [] }),

      totalCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.qty * Number(i.price || 0), 0),
    }),
    {
      name: 'cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);


