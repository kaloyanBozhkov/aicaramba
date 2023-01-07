import Price from 'components/atoms/Price/Price.atom'

import { Group } from '@mantine/core'
import type { Currency } from '@prisma/client'

import styles from './styles.module.scss'

const CartTotal = ({
  totalPrice,
  currency,
  modifier = 'default',
}: {
  totalPrice: number
  currency: Currency
  modifier?: 'default' | 'bigger'
}) => (
  <Group align="center" position="apart" className={styles.cartTotal} data-modifier={modifier}>
    <p>TOTAL</p>
    <Price price={totalPrice} currency={currency} className={styles.price} />
  </Group>
)
export default CartTotal
