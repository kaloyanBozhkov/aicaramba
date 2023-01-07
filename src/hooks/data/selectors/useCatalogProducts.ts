import { useMemo } from 'react'

import type Product from 'classes/Product'

export const groupProductsByStatus = (products?: Product[] | Product) => {
  const initialState = {
    new: [] as Product[],
    sold: [] as Product[],
    gone: [] as Product[],
    fire: [] as Product[],
  }

  if (!products) return initialState

  return (Array.isArray(products) ? products : [products]).reduce((acc, p) => {
    const key = p.status.toLowerCase() as keyof typeof acc
    return {
      ...acc,
      [key]: [...acc[key], p],
    }
  }, initialState)
}

const useGroupProductsByStatus = (p?: Product[] | Product) => {
  const { new: fresh, sold, gone, fire } = useMemo(() => groupProductsByStatus(p), [p])

  return {
    fire,
    sold,
    gone,
    fresh,
  }
}

export default useGroupProductsByStatus
