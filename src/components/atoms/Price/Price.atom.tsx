import { type Currency } from '@prisma/client'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const Price = ({
  currency,
  price,
  className,
}: {
  currency: Currency
  price: number
  className?: string
}) => (
  <p className={extendClassNameProp(styles.price, className)} data-price="true">
    {price} {currency}
  </p>
)

export default Price
