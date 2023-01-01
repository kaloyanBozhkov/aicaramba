import Link from 'next/link'

import Price from 'components/atoms/Price/Price.atom'
import Status from 'components/atoms/Status/Status.atom'

import { Grid, Group } from '@mantine/core'
import { Currency, ProductStatus } from '@prisma/client'

import styles from './styles.module.scss'

export interface IProductInfo {
  status: ProductStatus
  name: string
  price: number
  currency: Currency
  style: string
  colorScheme: string
}

interface IProductInfoProps extends IProductInfo {
  uppercase?: boolean
  textVariant: 'primary' | 'secondary'
  layoutVariant: 'primary' | 'secondary' | 'tertiary'
  withStatusLink?: boolean
  withNameLink?: string
}

const ProductInfo = ({
  style,
  colorScheme,
  status,
  name,
  price,
  currency,
  uppercase = false,
  textVariant = 'primary',
  layoutVariant = 'primary',
  withStatusLink = false,
  withNameLink,
}: IProductInfoProps) => {
  const isSecondary = layoutVariant === 'secondary',
    statusContent = <Status className={styles.status} status={status} />,
    priceComponent = <Price price={price} currency={currency} />,
    title = (
      <h2 data-uppercase={uppercase} data-variant={textVariant} data-with-quotes="true">
        {name}
      </h2>
    )

  return (
    <Grid gutter="xs" grow columns={2} className={styles.productInfo}>
      <Grid.Col span={isSecondary ? 1 : 2}>
        {withStatusLink ? (
          <Link href={`/artworks/${status.toLocaleLowerCase()}`} data-naked="true">
            {statusContent}
          </Link>
        ) : (
          statusContent
        )}
      </Grid.Col>
      <Grid.Col span={isSecondary ? 2 : 1} orderLg={3} className={styles.title}>
        <Group position="apart" noWrap align="flex-start">
          {withNameLink ? (
            <Link href={withNameLink} data-naked="true">
              {title}
            </Link>
          ) : (
            title
          )}
          {!isSecondary && priceComponent}
        </Group>
      </Grid.Col>
      <Grid.Col span={2} className={styles.info} orderLg={4}>
        <p>
          <span>Style:</span> {style}
        </p>
        <p>
          <span>Color Scheme:</span> {colorScheme}
        </p>
      </Grid.Col>
      {isSecondary && (
        <Grid.Col span={1} orderLg={2}>
          {priceComponent}
        </Grid.Col>
      )}
    </Grid>
  )
}

export default ProductInfo
