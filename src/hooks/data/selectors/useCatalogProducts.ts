import { useProducts } from 'stores/Products.store'

import type Product from 'classes/Product'

export const groupProductsByStatus = (products: Product[] = []) =>
  products.reduce(
    (acc, p) => {
      const key = p.status.toLowerCase() as keyof typeof acc
      return {
        ...acc,
        [key]: [...acc[key], p],
      }
    },
    {
      new: [] as Product[],
      sold: [] as Product[],
      gone: [] as Product[],
      fire: [] as Product[],
    }
  )

const useCatalogProducts = () => {
  const {
    fire,
    sold,
    gone,
    new: fresh,
  } = useProducts(({ products }) => groupProductsByStatus(Object.values(products)))

  return {
    fire,
    sold,
    gone,
    fresh,
  }
}

export default useCatalogProducts
