import { useEffect } from 'react'

import { useProducts } from 'stores/Products.store'

import { IProductProps } from 'classes/Product'

const useSetupProducts = (...p: IProductProps[]) => {
  const addP = useProducts((s) => s.addP)

  useEffect(() => addP(p), [addP, p])
}
