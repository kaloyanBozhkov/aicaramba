import { useEffect } from 'react'

import { useProducts } from 'stores/Products.store'

import { IProductProps } from 'classes/Product'

/**
 * initialize and set one or more products into store
 */
const useSetupProducts = (p: IProductProps[] | IProductProps | undefined) => {
  const addP = useProducts((s) => s.addP)

  useEffect(() => {
    if (p) addP(p)
  }, [addP, p])
}

export default useSetupProducts
