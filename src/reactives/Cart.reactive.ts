import { makeVar } from '@apollo/client'

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

export const cartVar = makeVar<Cart>({
  products: {},
  pending: [],
  opened: false,
  open: () => {
    const prev = cartVar()

    if (!prev.opened) return

    cartVar({
      ...prev,
      opened: true,
    })
  },
  close: () => {
    const prev = cartVar()

    if (!prev.opened) return

    cartVar({
      ...prev,
      opened: false,
    })
  },
  add: (pId, size, color = Color.BLACK) => {
    const prev = cartVar(),
      products = {
        ...prev.products,
        // overwrites existing one in cart
        [pId]: {
          pId,
          size,
          color,
        },
      }

    cartVar({
      ...prev,
      pending: [...prev.pending, pId],
    })

    // add availability check
    setTimeout(() => {
      cartVar({
        ...prev,
        products,
        pending: prev.pending.filter((id) => id !== pId),
      })
    }, 5000)
  },
  remove: (pId) => {
    const prev = cartVar()

    if (!prev.products[pId]) return

    const products = {
      ...prev.products,
    }

    delete products[pId]

    cartVar({
      ...prev,
      products,
    })
  },
  update: (pId, newConfig) => {
    const prev = cartVar()

    // not in cart so cant update
    if (!prev.products[pId])
      return console.error('Cannot update product in cart which is not yet added to the cart')

    const products = {
      ...prev.products,
    }

    products[pId] = {
      // copy the config
      ...prev.products[pId],
      // update size, or color, or both
      ...newConfig,
    }

    cartVar({
      ...prev,
      products,
    })
  },
})
