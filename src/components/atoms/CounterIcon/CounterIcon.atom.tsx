import type { ReactNode } from 'react'

import styles from './styles.module.scss'

const CounterIcon = ({
  children,
  count,
  withoutZero,
}: {
  children: ReactNode
  count: number
  withoutZero?: boolean
}) => {
  let c: ReactNode = <p>{count}</p>

  if (withoutZero && count === 0) c = null

  return (
    <div className={styles.counterIcon}>
      {children}
      {c}
    </div>
  )
}

export default CounterIcon
