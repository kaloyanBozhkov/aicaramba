import { ReactElement, ReactNode } from 'react'

import styles from './styles.module.scss'

type MainTemplateProps = {
  header: ReactNode
  modal: ReactElement | null
  children: ReactNode
  banner: ReactElement | null
  footer: ReactNode
  cart: ReactNode | null
}

const MainTemplate = ({ header, modal, banner, footer, children, cart }: MainTemplateProps) => (
  <div className={styles.mainTemplate}>
    {banner && <section className={styles.banner}>{banner}</section>}
    <header>{header}</header>
    <main>{children}</main>
    <section className={styles.footer}>{footer}</section>
    {modal && <section className={styles.modal}>{modal}</section>}
    {cart}
  </div>
)

export default MainTemplate
