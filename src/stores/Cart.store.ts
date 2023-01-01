import create from 'zustand'

import { IProductProps } from 'classes/Product'

import { Color, Size } from '@prisma/client'

export interface ProductConfig extends IProductProps {
  size: Size
  color: Color
}

type Cart = {
  products: Record<IProductProps['id'], ProductConfig>
  pending: string[]
  opened: boolean
  addDrawerProductId: null | IProductProps['id']
  controls: {
    open: () => void
    close: () => void
    add: (productProps: IProductProps, size: Size, color?: Color) => void
    remove: (pId: string) => void
    update: (
      pId: string,
      newConfig: { size: Size; color: Color } | { size: Size } | { color: Color }
    ) => void
    openAddDrawer: (id: IProductProps['id']) => void
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
    add: (productProps, size, color = Color.BLACK) => {
      set((prev) => ({
        ...prev,
        products: {
          ...prev.products,
          // overwrites existing one in cart
          [productProps.id]: {
            ...productProps,
            size,
            color,
          },
        },
        pending: [...prev.pending, productProps.id],
      }))

      // add availability check
      setTimeout(() => {
        set((prev) => ({
          ...prev,
          pending: prev.pending.filter((id) => id !== productProps.id),
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
