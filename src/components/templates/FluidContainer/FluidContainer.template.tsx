import { ReactNode } from 'react'

import { Container, ContainerProps } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const FluidCotainer = ({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
} & Partial<ContainerProps>) => (
  <Container fluid className={extendClassNameProp(styles.fluidContainer, className)} {...props}>
    {children}
  </Container>
)

export default FluidCotainer
