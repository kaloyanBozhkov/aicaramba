import { CSSProperties } from 'react'

import styles from './styles.module.scss'

const TextWritten = ({ label, ...props }: { label: string } & Partial<CSSProperties>) => (
  <span className={styles.textWritten} style={{ ...props }}>
    {label}
  </span>
)

export default TextWritten
