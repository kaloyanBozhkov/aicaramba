import CartProductActions from 'components/molecules/CartProductActions/CartProductActions.molecule'
import ProductSummaryCard from 'components/molecules/ProductSummaryCard/ProductSummaryCard.molecule'

import { Stack } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import type { Color, Currency, ProductStatus, Size } from '@prisma/client'

import styles from './styles.module.scss'

type ICartProductCardProps = {
  style: string
  colorScheme: string
  name: string
  price: number
  currency: Currency
  status: ProductStatus
  to: string
  imgSrc: string
  size: Size
  color: Color
  onRemove: () => void
}

const CartProductCard = ({ size, color, onRemove, ...summaryCardProps }: ICartProductCardProps) => {
  const [showMore, setShowMore] = useToggle([false, true]),
    actions = (
      <CartProductActions
        size={size}
        color={color}
        price={summaryCardProps.price}
        currency={summaryCardProps.currency}
        onRemove={onRemove}
        buttonPos={showMore ? 'topRight' : 'bottom'}
      />
    )

  return (
    <Stack spacing="xs" pos="relative" className={styles.cardWrapper}>
      <ProductSummaryCard
        modifier="brief"
        onToggleBrief={() => setShowMore((prev) => !prev)}
        {...summaryCardProps}
      >
        {actions}
      </ProductSummaryCard>
      {showMore && actions}
    </Stack>
  )
}

export default CartProductCard
