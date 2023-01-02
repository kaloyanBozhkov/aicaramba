import { useCallback } from 'react'

import { useRouter } from 'next/router'

import { useCart } from 'stores/Cart.store'
import { useProducts } from 'stores/Products.store'

import Product from 'classes/Product'

import useOnLocationChange from 'hooks/location/useOnLocationChange'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'
import Price from 'components/atoms/Price/Price.atom'

import { Drawer, Group, Stack, Text } from '@mantine/core'

import CartProductCard from '../CartProductCard/CartProductCard.organism'

import styles from './styles.module.scss'

const Cart = () => {
  const cart = useCart(),
    productsInCart = useProducts(
      useCallback(
        (state) => {
          const pIds = Object.keys(cart.products),
            products = Object.values(state.products)

          // select products that are in cart
          return products.reduce(
            (acc, p) => [...acc, ...(pIds.includes(p.id) ? [p] : [])],
            [] as Product[]
          )
        },
        [cart.products]
      )
    ),
    cartEmpty = productsInCart.length === 0,
    { push } = useRouter()

  useOnLocationChange({
    onChange: () => cart.controls.close(),
  })

  return (
    <Drawer
      opened={cart.opened}
      className={styles.cart}
      onClose={cart.controls.close}
      closeOnClickOutside
      closeOnEscape
      position="right"
      transitionDuration={300}
      withCloseButton
      overlayOpacity={0.3}
      title={
        <Group align="center" position="left">
          <Text size="xs">YOUR BAG</Text>
        </Group>
      }
      padding="xl"
      size="xl"
      lockScroll
    >
      <Stack className={styles.productsWrapper}>
        {cartEmpty ? (
          <h3>YOUR BAG IS CURRENTLY EMPTY.</h3>
        ) : (
          productsInCart.map((p) => (
            <CartProductCard
              key={p.id}
              style={p.style}
              colorScheme={p.colorScheme}
              name={p.name}
              price={p.price}
              currency={p.currency}
              status={p.status}
              to={p.url}
              imgSrc={p.imgSrc}
              {...cart.products[p.id]}
              onRemove={() => cart.controls.remove(p.id)}
            />
          ))
        )}
      </Stack>
      {!cartEmpty && (
        <Stack className={styles.bottom}>
          <Group align="center" position="apart" className={styles.cartTotal}>
            <p>Total:</p>
            <Price
              price={productsInCart.reduce((acc, p) => acc + p.price, 0)}
              currency={productsInCart[0].currency}
              className={styles.price}
            />
          </Group>
          <ActionButton withShadow label="CHECKOUT" modifier="primary" />
          <ActionButton
            withShadow
            label="YOUR BAG"
            modifier="secondary"
            onClick={() => push('/bag')}
          />
        </Stack>
      )}
    </Drawer>
  )
}

export default Cart
