import create from 'zustand'

import Product, { type IProductProps } from 'classes/Product'

interface IProductsStore {
  products: Record<Product['id'], Product>
  addP: (p: IProductProps | IProductProps[]) => void
}

export const useProducts = create<IProductsStore>((set) => ({
  products: {},
  addP: (p) =>
    set((prev) => ({
      products: Array.isArray(p)
        ? p.reduce((acc, p) => ({ ...acc, [p.id]: new Product(p) }), {
            ...prev.products,
          })
        : {
            ...prev.products,
            // overwrite existing
            [p.id]: new Product(p),
          },
    })),
}))
