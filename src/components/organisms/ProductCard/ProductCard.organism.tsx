import { useState } from 'react'

import Image from 'next/image'
import NavLink from 'next/link'

import useDesktopCheck from 'hooks/styles/useDesktopCheck'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import Chips from 'components/molecules/Chips/Chips.molecule'
import ProductInfo, { IProductInfo } from 'components/molecules/ProductInfo/ProductInfo.molecule'
import { sizes } from 'components/molecules/ProductSize/ProductSize.molecule'

import CornerZoom from 'components/organisms/CornerZoom/CornerZoom.organism'
import ProductAddDrawer from 'components/organisms/ProductAddDrawer/ProductAddDrawer.organism'

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
  onAddToCart: (id: string, size: Size) => void
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
    [openedDrawer, setOpenedDrawer] = useState(false),
    artwork = <Image src={imgSrc} width={1000} height={1000} alt="artwork preview" />

  return (
    <Stack className={styles.productCard} {...props}>
      <FluidContainer className={styles.preview}>
        {isDesktop && (
          <CornerZoom isAbsolute zoomTitle={name}>
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
        {isDesktop ? (
          <Stack className={styles.overlay}>
            <Group>
              <FontAwesomeIcon icon={faSquarePlus} /> <p>Quick Add</p>
            </Group>
            <Chips<Size>
              pending={isPending}
              items={sizes}
              selected={selectedSize}
              onSelected={(size) => onAddToCart(id, size)}
              onUnselected={() => onRemoveFromCart(id)}
            />
          </Stack>
        ) : (
          <Stack className={styles.mobileActions}>
            <CornerZoom zoomTitle={name}>{artwork}</CornerZoom>
            <ActionButton
              label={
                <Image
                  src="/assets/icons/add-to-bag.svg"
                  width={20}
                  height={20}
                  alt="add to bag icon"
                />
              }
              onClick={() => setOpenedDrawer(true)}
              modifier="circularIconBtn"
            />
            <ProductAddDrawer
              id={id}
              to={url}
              name={name}
              price={price}
              imgSrc={imgSrc}
              colorScheme={colorScheme}
              style={style}
              currency={currency}
              status={status}
              open={openedDrawer}
              onClose={() => setOpenedDrawer(false)}
            />
          </Stack>
        )}
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
