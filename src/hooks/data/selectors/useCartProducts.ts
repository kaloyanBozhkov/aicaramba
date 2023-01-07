import { useCallback } from 'react'

import { type ProductConfig, useCart } from 'stores/Cart.store'
import { useProducts } from 'stores/Products.store'

import type Product from 'classes/Product'

const useCartProducts = () => {
  const cartProducts = useCart((cart) => cart.products),
    productsInCart = useProducts(
      useCallback(
        ({ products }) => {
          const pIds = Object.keys(cartProducts)

          // select products that are in cart
          return pIds.reduce(
            (acc, pId) => [
              ...acc,
              ...(products[pId]
                ? [
                    {
                      product: products[pId],
                      config: cartProducts[pId],
                    },
                  ]
                : []),
            ],
            [] as {
              product: Product
              config: ProductConfig
            }[]
          )
        },
        [cartProducts]
      )
    )

  return productsInCart
}

export default useCartProducts
