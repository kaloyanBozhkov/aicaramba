import Status, { Statuses } from 'components/atoms/Status/Status.atom'

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
}: IProductInfoProps) => {
  const priceP = (
      <p className={styles.price}>
        {price} {currency}
      </p>
    ),
    isSecondary = layoutVariant === 'secondary'

  return (
    <Grid gutter="xs" grow columns={2} className={styles.productInfo}>
      <Grid.Col span={isSecondary ? 1 : 2}>
        <Status className={styles.status} {...Statuses[status]} />
      </Grid.Col>
      <Grid.Col span={isSecondary ? 2 : 1} orderLg={3} className={styles.title}>
        <Group position="apart" noWrap>
          <h2 data-uppercase={uppercase} data-variant={textVariant}>
            {name}
          </h2>
          {!isSecondary && priceP}
        </Group>
      </Grid.Col>
      <Grid.Col span={2} className={styles.info} orderLg={4}>
        <p>
          <span>Style:</span> {style}
        </p>
        <p>
          <span>Colors:</span> {colorScheme}
        </p>
      </Grid.Col>
      {isSecondary && (
        <Grid.Col span={1} orderLg={2}>
          {priceP}
        </Grid.Col>
      )}
    </Grid>
  )
}

export default ProductInfo
