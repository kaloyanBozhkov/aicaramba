import Image from 'next/image'
import { useRouter } from 'next/router'

import { useCart } from 'stores/Cart.store'

import CounterIcon from 'components/atoms/CounterIcon/CounterIcon.atom'

import { Container } from '@mantine/core'

import styles from './styles.module.scss'

interface ICartButton {
  iconSize: number
}

const CartButton = ({ iconSize }: ICartButton) => {
  const onOpenCart = useCart((state) => state.controls.open),
    cartProductsCount = useCart(
      (cart) => Object.keys(cart.products).filter((id) => !cart.pending.includes(id)).length
    ),
    router = useRouter()

  return (
    <Container
      onClick={router.pathname === '/bag' ? undefined : onOpenCart}
      className={styles.wrapper}
    >
      <CounterIcon withoutZero count={cartProductsCount}>
        <Image
          src="/assets/icons/shopping-basket.svg"
          alt="shopping-basket icon"
          width={iconSize}
          height={iconSize}
        />
      </CounterIcon>
    </Container>
  )
}

export default CartButton
