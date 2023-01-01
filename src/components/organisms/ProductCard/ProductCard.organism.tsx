import { useState } from 'react'

import Image from 'next/image'
import NavLink from 'next/link'

import { useCart } from 'stores/Cart.store'

import Product, { IProductProps } from 'classes/Product'

import useDesktopCheck from 'hooks/styles/useDesktopCheck'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import ArtworkModalTitle from 'components/molecules/ArtworkModalTitle/ArtworkModalTitle'
import Chips from 'components/molecules/Chips/Chips.molecule'
import ProductInfo, { IProductInfo } from 'components/molecules/ProductInfo/ProductInfo.molecule'
import { sizes } from 'components/molecules/ProductSize/ProductSize.molecule'

import CornerZoom from 'components/organisms/CornerZoom/CornerZoom.organism'

import FluidContainer from 'components/templates/FluidContainer/FluidContainer.template'

import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Stack, StackProps } from '@mantine/core'
import { Size } from '@prisma/client'

import styles from './styles.module.scss'

interface IProductCard extends IProductInfo {
  imgSrc: string
  name: string
  url: string
  id: string
  selectedSize?: Size
  isPending: boolean
  onAddToCart: (productProps: IProductProps, size: Size) => void
  onRemoveFromCart: (id: string) => void
}

const ProductCard = ({
  imgSrc,
  name,
  id,
  url,
  price,
  currency,
  colorScheme,
  style,
  status,
  isPending,
  selectedSize,
  onAddToCart,
  onRemoveFromCart,
  ...props
}: IProductCard & Partial<StackProps>) => {
  const isDesktop = useDesktopCheck(),
    artwork = <Image src={imgSrc} width={1000} height={1000} alt="artwork preview" />,
    openDrawer = useCart((cart) => cart.controls.openAddDrawer)

  let actions = null

  if (Product.isAvailable(status)) {
    actions = isDesktop ? (
      <Stack className={styles.overlay}>
        <Group>
          <FontAwesomeIcon icon={faSquarePlus} /> <p>Quick Add</p>
        </Group>
        <Chips<Size>
          pending={isPending}
          items={sizes}
          selected={selectedSize}
          onSelected={(size) =>
            onAddToCart(
              {
                name,
                style,
                status,
                id,
                colorScheme,
                price,
                currency,
              },
              size
            )
          }
          onUnselected={() => onRemoveFromCart(id)}
        />
      </Stack>
    ) : (
      <Stack className={styles.mobileActions}>
        <CornerZoom zoomTitle={<ArtworkModalTitle title={name} status={status} />}>
          {artwork}
        </CornerZoom>
        <ActionButton
          label={
            <Image
              src="/assets/icons/add-to-bag.svg"
              width={20}
              height={20}
              alt="add to bag icon"
            />
          }
          onClick={() => openDrawer(id)}
          modifier="circularIconBtn"
        />
      </Stack>
    )
  }

  return (
    <Stack className={styles.productCard} {...props}>
      <FluidContainer className={styles.preview}>
        {isDesktop && (
          <CornerZoom isAbsolute zoomTitle={<ArtworkModalTitle title={name} status={status} />}>
            {artwork}
          </CornerZoom>
        )}
        <NavLink href={url} data-naked="true">
          <Image
            src={imgSrc}
            alt="product-image"
            className={styles.productImage}
            width={1000}
            height={1000}
          />
        </NavLink>
        {actions}
      </FluidContainer>
      <NavLink href={url} data-naked="true">
        <ProductInfo
          name={name}
          price={price}
          colorScheme={colorScheme}
          style={style}
          currency={currency}
          status={status}
          layoutVariant="secondary"
          textVariant="secondary"
        />
      </NavLink>
    </Stack>
  )
}

export default ProductCard
