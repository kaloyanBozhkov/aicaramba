import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'
import Price from 'components/atoms/Price/Price.atom'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Group, Stack } from '@mantine/core'
import { Currency } from '@prisma/client'

import styles from './styles.module.scss'

const CartProductActions = ({
  size,
  color,
  currency,
  onRemove,
  price,
  buttonPos,
}: {
  size: string
  color: string
  onRemove: () => void
  currency: Currency
  price: number
  buttonPos: 'bottom' | 'topRight'
}) => {
  const Wrapper = buttonPos === 'bottom' ? Stack : Group

  return (
    <Wrapper position="apart" align={buttonPos === 'bottom' ? 'flex-start' : 'flex-end'}>
      <Stack className={styles.configPreview} spacing={0}>
        <p>
          SIZE: <b>{size}</b>
        </p>
        <p>
          COLOR: <b>{color}</b>
        </p>
        <Group spacing={0}>
          <p>CURRENT PRICE:</p>
          <Price price={price} currency={currency} className={styles.price} />
        </Group>
      </Stack>
      <ActionButton label="Remove" rightIcon={faClose} modifier="subtle" onClick={onRemove} />
    </Wrapper>
  )
}

export default CartProductActions
