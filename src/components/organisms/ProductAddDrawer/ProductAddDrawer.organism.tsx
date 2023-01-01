import { useCallback, useEffect, useState } from 'react'

import { useCart } from 'stores/Cart.store'
import { useProducts } from 'stores/Products.store'
import { useStyles } from 'stores/Styles.store'

import useOnLocationChange from 'hooks/location/useOnLocationChange'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import ProductColorSelector from 'components/molecules/ProductColorSelector/ProductColorSelector.molecule'
import ProductSize, { sizes } from 'components/molecules/ProductSize/ProductSize.molecule'
import ProductSummaryCard from 'components/molecules/ProductSummaryCard/ProductSummaryCard.molecule'

import { Drawer, Group, Stack } from '@mantine/core'

import styles from './styles.module.scss'

const ProductAddDrawer = () => {
  const id = useCart((state) => state.addDrawerProductId),
    isOpen = !!id,
    product = useProducts(useCallback((state) => (id ? state.products[id] : null), [id])),
    cartControls = useCart((cart) => cart.controls),
    size = useCart(useCallback((cart) => (id ? cart.products[id]?.size : undefined), [id])),
    color = useCart(useCallback((cart) => (id ? cart.products[id]?.color : undefined), [id])),
    inCart = size && color,
    isPending = useCart(useCallback((cart) => !!id && cart.pending.includes(id), [id])),
    // handle animation of "Adding" -> "Added"
    [sizeSelectionOver, setSizeSelectionOver] = useState(false),
    [added, setAdded] = useState(false),
    [closeAnim, setCloseAnim] = useState(false),
    toggleHeader = useStyles((s) => s.toggleHeader)

  useEffect(() => {
    if (inCart && !isPending && !added) setSizeSelectionOver(true)
  }, [inCart, added, isPending])

  useEffect(() => {
    if (!inCart) setSizeSelectionOver(false)
  }, [inCart])

  // hide header if showing
  useEffect(() => {
    toggleHeader(isOpen)
    return () => toggleHeader(isOpen)
  }, [isOpen, toggleHeader])

  // wait for transition to end before resetting
  useEffect(() => {
    if (closeAnim) {
      const id = setTimeout(() => {
        cartControls.closeAddDrawer()
        setCloseAnim(false)
        setSizeSelectionOver(false)
        toggleHeader(false)
      }, 400)

      return () => clearTimeout(id)
    }
  }, [closeAnim, cartControls, toggleHeader])

  useOnLocationChange({
    onChange: () => cartControls.closeAddDrawer(),
  })

  let content = null

  if ((isOpen || closeAnim) && product) {
    const { id, name, style, status, colorScheme, price, currency, imgSrc, url } = product

    content = (
      <>
        <ProductSummaryCard
          className={styles.summaryCard}
          price={price}
          colorScheme={colorScheme}
          style={style}
          currency={currency}
          status={status}
          name={name}
          imgSrc={imgSrc}
          to={url}
        />
        {sizeSelectionOver ? (
          <Stack className={styles.remove} align="flex-start" spacing="xs">
            <label>This product is in your cart.</label>
            <p>
              <b>SIZE:</b> {size}
            </p>
            <ProductColorSelector
              imgSrc={imgSrc}
              activeColor={color!}
              onColorSelected={(color) => cartControls.update(id, { color })}
            />
            <Group className={styles.actions}>
              <ActionButton
                label="View Cart"
                onClick={() => {
                  cartControls.closeAddDrawer()
                  cartControls.open()
                }}
                modifier="primary"
              />
              <ActionButton
                label="Remove"
                onClick={() => cartControls.remove(id)}
                modifier="secondary"
              />
            </Group>
          </Stack>
        ) : (
          <ProductSize
            pending={isPending}
            variant="column"
            selected={size}
            onAddAnimationEnded={() => {
              setAdded(false)
              setSizeSelectionOver(true)
            }}
            onSizeSelected={(size) => {
              cartControls.add(
                {
                  id,
                  name,
                  style,
                  status,
                  colorScheme,
                  price,
                  currency,
                },
                size
              )
              setAdded(true)
            }}
          />
        )}
      </>
    )
  }

  return (
    <Drawer
      className={styles.productAddDrawer}
      withinPortal={false}
      position="bottom"
      padding="xl"
      size={sizeSelectionOver ? '47rem' : `${20 + 5.5 * sizes.length}rem`}
      opened={isOpen && !closeAnim}
      transitionDuration={400}
      onClose={() => setCloseAnim(true)}
    >
      {content}
    </Drawer>
  )
}

export default ProductAddDrawer
