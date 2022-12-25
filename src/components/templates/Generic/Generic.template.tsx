import { ReactNode } from 'react'

import styles from './styles.module.scss'

type GenericTemplateProps = {
  children: ReactNode
  sideContent?: ReactNode
}

const GenericTemplate = ({ children, sideContent }: GenericTemplateProps) => (
  <div className={styles.genericTemplate}>
    <main>{children}</main>
    {sideContent && <section>{sideContent}</section>}
  </div>
)

export default GenericTemplate
