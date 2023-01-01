import { ProductConfig, useCart } from 'stores/Cart.store'

import Product from 'classes/Product'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'
import Price from 'components/atoms/Price/Price.atom'

import ProductSummaryCard from 'components/molecules/ProductSummaryCard/ProductSummaryCard.molecule'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Drawer, Group, Stack, Text } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { Currency } from '@prisma/client'

import styles from './styles.module.scss'

const Cart = () => {
  const cart = useCart(),
    productsArr = Object.values(cart.products),
    cartEmpty = productsArr.length === 0

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
          productsArr.map((p) => (
            <ProductCartCard key={p.id} p={p} onRemove={() => cart.controls.remove(p.id)} />
          ))
        )}
      </Stack>
      {!cartEmpty && (
        <Stack className={styles.bottom}>
          <Group align="center" position="apart" className={styles.cartTotal}>
            <p>Total:</p>
            <Price
              price={productsArr.reduce((acc, p) => acc + p.price, 0)}
              currency={productsArr[0].currency}
              className={styles.price}
            />
          </Group>
          <ActionButton withShadow label="CHECKOUT" modifier="primary" />
          <ActionButton withShadow label="YOUR BAG" modifier="secondary" />
        </Stack>
      )}
    </Drawer>
  )
}

export default Cart

// @TODO move to own molecules if these are ever needed elsewhere
const ProductActions = ({
    size,
    color,
    currency,
    onRemove,
    price,
    buttonPos,
  }: {
    size: string
    color: string
    onRemove: () => void
    currency: Currency
    price: number
    buttonPos: 'bottom' | 'topRight'
  }) => {
    const Wrapper = buttonPos === 'bottom' ? Stack : Group

    return (
      <Wrapper position="apart" align={buttonPos === 'bottom' ? 'flex-start' : 'flex-end'}>
        <Stack className={styles.configPreview} spacing={0}>
          <p>
            SIZE: <b>{size}</b>
          </p>
          <p>
            COLOR: <b>{color}</b>
          </p>
          <Group spacing={0}>
            <p>CURRENT PRICE:</p>
            <Price price={price} currency={currency} className={styles.price} />
          </Group>
        </Stack>
        <ActionButton label="Remove" rightIcon={faClose} modifier="subtle" onClick={onRemove} />
      </Wrapper>
    )
  },
  ProductCartCard = ({ p, onRemove }: { p: ProductConfig; onRemove: () => void }) => {
    const [showMore, setShowMore] = useToggle([false, true])

    return (
      <Stack spacing="xs" pos="relative">
        <ProductSummaryCard
          to={Product.getProductPageURL(p.id)}
          imgSrc={Product.getProductImageURL(p.id)}
          modifier="brief"
          onToggleBrief={() => setShowMore((prev) => !prev)}
          {...p}
        >
          <ProductActions
            size={p.size}
            color={p.color}
            price={p.price}
            currency={p.currency}
            onRemove={onRemove}
            buttonPos="bottom"
          />
        </ProductSummaryCard>
        {showMore && (
          <ProductActions
            size={p.size}
            color={p.color}
            price={p.price}
            currency={p.currency}
            onRemove={onRemove}
            buttonPos="topRight"
          />
        )}
      </Stack>
    )
  }
