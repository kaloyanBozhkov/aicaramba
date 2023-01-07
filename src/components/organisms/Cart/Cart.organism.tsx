import Link from 'next/link'

import { useCart } from 'stores/Cart.store'

import useCartProducts from 'hooks/data/selectors/useCartProducts'
import useOnLocationChange from 'hooks/location/useOnLocationChange'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import CartTotal from 'components/molecules/CartTotal/CartTotal.molecule'

import { Drawer, Group, Stack, Text } from '@mantine/core'

import CartProductCard from '../CartProductCard/CartProductCard.organism'

import styles from './styles.module.scss'

const Cart = () => {
  const cartControls = useCart((cart) => cart.controls),
    cartOpened = useCart((cart) => cart.opened),
    productsInCart = useCartProducts(),
    empty = productsInCart.length === 0

  useOnLocationChange({
    onChange: () => cartControls.close(),
  })

  return (
    <Drawer
      opened={cartOpened}
      className={styles.cart}
      onClose={cartControls.close}
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
        {empty ? (
          <h3>YOUR BAG IS CURRENTLY EMPTY.</h3>
        ) : (
          productsInCart.map(({ product: p, config }) => (
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
              {...config}
              onRemove={() => cartControls.remove(p.id)}
            />
          ))
        )}
      </Stack>
      {!empty && (
        <Stack className={styles.bottom}>
          <CartTotal
            totalPrice={productsInCart.reduce((acc, { product: p }) => acc + p.price, 0)}
            currency={productsInCart[0].product.currency}
          />
          <ActionButton withShadow label="CHECKOUT" modifier="primary" />
          <Link href="/bag" data-naked="true">
            <ActionButton withShadow label="YOUR BAG" modifier="secondary" />
          </Link>
        </Stack>
      )}
    </Drawer>
  )
}

export default Cart
