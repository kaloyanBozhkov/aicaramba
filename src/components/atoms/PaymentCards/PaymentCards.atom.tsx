import Image from 'next/image'

import styles from './styles.module.scss'

const PaymentCard = ({
  card,
  size = 's',
}: {
  card: 'visa' | 'amex' | 'mastercard' | 'discover' | 'paypal' | 'diners'
  size?: 's'
}) => {
  return (
    <Image
      className={styles.paymentCard}
      data-size={size}
      src={`/assets/svg/paymentCards/${card}.svg`}
      width={38}
      height={24}
      alt={card}
    />
  )
}

export default PaymentCard
