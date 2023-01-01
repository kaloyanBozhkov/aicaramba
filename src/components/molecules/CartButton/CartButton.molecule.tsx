import Image from 'next/image'

import { useCart } from 'stores/Cart.store'

import styles from './styles.module.scss'

interface ICartButton {
  iconSize: number
}

const CartButton = ({ iconSize }: ICartButton) => {
  const onOpenCart = useCart((state) => state.controls.open)

  return (
    <Image
      src="/assets/icons/shopping-basket.svg"
      alt="shopping-basket icon"
      width={iconSize}
      height={iconSize}
      className={styles.icon}
      onClick={onOpenCart}
    />
  )
}

export default CartButton
