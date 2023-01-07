import { useCallback, useEffect } from 'react'

import { useProducts } from 'stores/Products.store'

import { IProductProps } from 'classes/Product'

/**
 * initialize and set one or more products into store
 * return added products
 */
const useSetupProducts = (p: IProductProps[] | IProductProps | undefined) => {
  const addP = useProducts((s) => s.addP),
    addedProducts = useProducts(
      useCallback(
        (s) => {
          if (!p) return []

          if (Array.isArray(p)) return p.map(({ id }) => s.products[id]).filter((n) => n)

          return s.products[p.id]
        },
        [p]
      )
    )

  useEffect(() => {
    if (p) addP(p)
  }, [addP, p])

  return addedProducts
}

export default useSetupProducts
