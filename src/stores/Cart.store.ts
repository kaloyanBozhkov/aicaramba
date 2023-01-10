import create from 'zustand'

import type Product from 'classes/Product'

import { Color, Size } from '@prisma/client'

type ProductId = Product['id']

export interface ProductConfig {
  size: Size
  color: Color
}

export type Cart = {
  products: Record<ProductId, ProductConfig>
  pending: string[]
  opened: boolean
  addDrawerProductId: null | ProductId
  controls: {
    open: () => void
    close: () => void
    add: (props: { id: ProductId; size: Size; color?: Color; openCartOnAdd?: boolean }) => void
    remove: (pId: string) => void
    update: (
      pId: string,
      newConfig: { size: Size; color: Color } | { size: Size } | { color: Color }
    ) => void
    openAddDrawer: (id: ProductId) => void
    closeAddDrawer: () => void
  }
}

export const useCart = create<Cart>((set) => ({
  products: {},
  pending: [],
  opened: false,
  addDrawerProductId: null,
  controls: {
    open: () =>
      set((prev) => {
        if (prev.opened) return prev

        return {
          ...prev,
          opened: true,
        }
      }),
    close: () =>
      set((prev) => {
        if (!prev.opened) return prev

        return {
          ...prev,
          opened: false,
        }
      }),
    add: ({ id: pId, size, color = Color.BLACK, openCartOnAdd = false }) => {
      set((prev) => ({
        ...prev,
        products: {
          ...prev.products,
          // overwrites existing one in cart
          [pId]: {
            size,
            color,
          },
        },
        pending: [...prev.pending, pId],
      }))

      // add availability check
      setTimeout(() => {
        set((prev) => ({
          ...prev,
          pending: prev.pending.filter((id) => id !== pId),
          opened: openCartOnAdd ? true : prev.opened,
        }))
      }, 1000)
    },
    remove: (pId) =>
      set((prev) => {
        if (!prev.products[pId]) return prev

        const products = {
          ...prev.products,
        }

        delete products[pId]

        return {
          ...prev,
          products,
        }
      }),
    update: (pId, newConfig) =>
      set((prev) => {
        // not in cart so cant update
        if (!prev.products[pId]) {
          console.error('Cannot update product in cart which is not yet added to the cart')
          return prev
        }

        const products = {
          ...prev.products,
        }

        products[pId] = {
          // copy the config
          ...prev.products[pId],
          // update size, or color, or both
          ...newConfig,
        }

        return {
          products,
        }
      }),
    openAddDrawer: (id) => set({ addDrawerProductId: id }),
    closeAddDrawer: () => set({ addDrawerProductId: null }),
  },
}))
