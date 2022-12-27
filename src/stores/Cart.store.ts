import create from 'zustand'

import { Color, Size } from '@prisma/client'

export type ProductConfig = {
  pId: string
  size: Size
  color: Color
}

type Cart = {
  products: Record<string, ProductConfig>
  pending: string[]
  opened: boolean
  open: () => void
  close: () => void
  add: (pId: string, size: Size, color?: Color) => void
  remove: (pId: string) => void
  update: (
    pId: string,
    newConfig: { size: Size; color: Color } | { size: Size } | { color: Color }
  ) => void
}

export const useCart = create<Cart>((set) => ({
  products: {},
  pending: [],
  opened: false,
  open: () =>
    set((prev) => {
      if (!prev.opened) return prev

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
  add: (pId, size, color = Color.BLACK) => {
    set((prev) => ({
      ...prev,
      pending: [...prev.pending, pId],
    }))

    // add availability check
    setTimeout(() => {
      set((prev) => ({
        ...prev,
        products: {
          ...prev.products,
          // overwrites existing one in cart
          [pId]: {
            pId,
            size,
            color,
          },
        },
        pending: prev.pending.filter((id) => id !== pId),
      }))
    }, 5000)
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
        ...prev,
        products,
      }
    }),
}))
