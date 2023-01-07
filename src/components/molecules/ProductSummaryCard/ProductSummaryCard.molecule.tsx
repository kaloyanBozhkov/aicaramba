import { type ReactNode, useState } from 'react'

import Image from 'next/image'
import NavLink from 'next/link'
import Link from 'next/link'

import Status from 'components/atoms/Status/Status.atom'

import ProductInfo from 'components/molecules/ProductInfo/ProductInfo.molecule'

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Stack } from '@mantine/core'
import type { Currency, ProductStatus } from '@prisma/client'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

type IProductSummaryCardProps = {
  style: string
  colorScheme: string
  name: string
  price: number
  currency: Currency
  status: ProductStatus
  to: string
  imgSrc: string
  className?: string
  modifier?: 'default' | 'brief'
  children?: ReactNode
  onToggleBrief?: () => void
  withoutPrice?: boolean
}

const ProductSummaryCard = ({
  style,
  colorScheme,
  name,
  price,
  currency,
  status,
  to,
  imgSrc,
  className,
  modifier = 'default',
  children,
  withoutPrice = false,
  onToggleBrief,
}: IProductSummaryCardProps) => {
  const [showingBrief, setShowingBrief] = useState(modifier === 'brief'),
    toggleBtn = (
      <button
        className={styles.toggleBtn}
        onClick={() => {
          setShowingBrief((prev) => !prev)
          onToggleBrief?.()
        }}
        data-mode={showingBrief ? 'more' : 'less'}
      >
        <FontAwesomeIcon icon={showingBrief ? faAngleDown : faAngleUp} />
        {showingBrief ? 'More' : 'Less'}
      </button>
    )

  return (
    <Group
      className={extendClassNameProp(styles.productSummaryCard, className)}
      noWrap
      data-without-price={withoutPrice === true ? 'true' : undefined}
    >
      <NavLink href={to} data-naked="true">
        <Image
          src={imgSrc}
          alt="product-image"
          width={1000}
          height={1000}
          className={styles.preview}
        />
      </NavLink>
      {modifier === 'default' || !showingBrief ? (
        <>
          <ProductInfo
            layoutVariant="primary"
            textVariant="secondary"
            price={price}
            colorScheme={colorScheme}
            style={style}
            currency={currency}
            status={status}
            name={name}
            titleLink={to}
          />
          {modifier === 'brief' && toggleBtn}
        </>
      ) : (
        <Stack className={styles.briefWrapper} spacing="xs" justify="space-between">
          <Group noWrap className={styles.briefSummary} spacing="xs" align="flex-start">
            <Group noWrap className={styles.heading} spacing="xs" align="center" position="left">
              <Status icon={status} />
              <Link href={to} data-naked="true">
                <h2 data-capitalize="true" data-variant="secondary" data-with-quotes="true">
                  {name}
                </h2>
              </Link>
            </Group>
            {toggleBtn}
          </Group>
          {children}
        </Stack>
      )}
    </Group>
  )
}

export default ProductSummaryCard
