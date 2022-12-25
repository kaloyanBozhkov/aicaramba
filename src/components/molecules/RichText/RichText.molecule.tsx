import { ReactNode } from 'react'

import { Center, CenterProps } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const RichText = ({
  title,
  children,
  className,
  variation,
  topComponent,
  alignment = 'left',
  justify = 'middle',
  ...props
}: {
  topComponent?: ReactNode
  title?: string | ReactNode
  children?: string | ReactNode
  className?: string
  variation?: 'black' | 'white'
  alignment?: 'center' | 'left' | 'right'
  justify?: 'top' | 'middle' | 'bottom'
} & Partial<CenterProps>) => (
  <Center
    className={extendClassNameProp(styles.richText, className)}
    data-variation={variation}
    data-alignment={alignment}
    data-justify={justify}
    {...props}
  >
    {topComponent}
    {title && <h2>{title}</h2>}
    {children && <p>{children}</p>}
  </Center>
)

export default RichText
