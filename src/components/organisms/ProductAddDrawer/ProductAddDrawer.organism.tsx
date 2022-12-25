import { useReactiveVar } from '@apollo/client'

import Image from 'next/image'
import NavLink from 'next/link'

import { cartVar } from 'reactives/Cart.reactive'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import ProductColorSelector from 'components/molecules/ProductColorSelector/ProductColorSelector.molecule'
import ProductInfo, { IProductInfo } from 'components/molecules/ProductInfo/ProductInfo.molecule'
import ProductSize, { sizes } from 'components/molecules/ProductSize/ProductSize.molecule'

import { Drawer, Group, Stack } from '@mantine/core'

import styles from './styles.module.scss'

interface IProductAddDrawer extends IProductInfo {
  open: boolean
  id: string
  to: string
  imgSrc: string
  onClose: () => void
}

const ProductAddDrawer = ({
  imgSrc,
  id,
  to,
  open,
  price,
  currency,
  colorScheme,
  style,
  status,
  name,
  onClose,
}: IProductAddDrawer) => {
  const cart = useReactiveVar(cartVar),
    inCart = cart.products[id],
    isPending = cart.pending.includes(id)

  return (
    <Drawer
      className={styles.productAddDrawer}
      withinPortal={false}
      position="bottom"
      padding="xl"
      size={inCart ? '47rem' : `${20 + 5.5 * sizes.length}rem`}
      opened={open}
      onClose={onClose}
    >
      <Group className={styles.mobileAddToBagInfo}>
        <NavLink href={to} data-naked="true">
          <Image
            src={imgSrc}
            alt="product-image"
            width={1000}
            height={1000}
            className={styles.preview}
          />
        </NavLink>
        <ProductInfo
          layoutVariant="primary"
          textVariant="secondary"
          price={price}
          colorScheme={colorScheme}
          style={style}
          currency={currency}
          status={status}
          name={name}
        />
      </Group>
      {inCart ? (
        <Stack className={styles.remove} align="flex-start" spacing="xs">
          <label>This product is in your cart.</label>
          <p>
            <b>SIZE:</b> {inCart.size}
          </p>
          <ProductColorSelector
            activeColor={inCart.color}
            onColorSelected={(color) => cart.update(id, { color })}
          />
          <Group className={styles.actions}>
            <ActionButton
              label="View Cart"
              onClick={() => {
                onClose()
                cart.open()
              }}
              modifier="primary"
            />
            <ActionButton label="Remove" onClick={() => cart.remove(id)} modifier="secondary" />
          </Group>
        </Stack>
      ) : (
        <ProductSize
          pending={isPending}
          variant="column"
          onSizeSelected={(size) => cart.add(id, size)}
        />
      )}
    </Drawer>
  )
}

export default ProductAddDrawer
