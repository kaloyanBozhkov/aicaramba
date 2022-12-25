import { HTMLAttributes } from 'react'

import styles from './styles.module.scss'

const CreatorSignature = ({
  variant,
  ...props
}: Partial<HTMLAttributes<HTMLParagraphElement>> & { variant?: 'secondary' }) => (
  <p className={styles.signature} {...(props || {})} data-variant={variant}>
    {new Date().getFullYear()} powered by K-BITS.
  </p>
)

export default CreatorSignature
