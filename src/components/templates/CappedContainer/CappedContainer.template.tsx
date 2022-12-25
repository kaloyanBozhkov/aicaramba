import { ReactNode } from 'react'

import { Container, ContainerProps } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

/**
 * Layout helper for capping width of content
 */
const CappedContainerTemplate = ({
  children,
  className,
  withWrapper = false,
  withoutPadding = false,
  ...props
}: {
  children: ReactNode
  withWrapper?: boolean
  className?: string
  withoutPadding?: boolean
} & Partial<ContainerProps>) => (
  <Container
    fluid
    data-with-wrapper={withWrapper}
    data-without-padding={withoutPadding}
    className={extendClassNameProp(styles.cappedContainerTemplate, className)}
    {...props}
  >
    {children}
  </Container>
)

export default CappedContainerTemplate
