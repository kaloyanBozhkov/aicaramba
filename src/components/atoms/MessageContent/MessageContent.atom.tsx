import { ReactNode } from 'react'

import { Container } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const MessageContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <Container fluid className={extendClassNameProp(styles.messageContent, className)}>
    {children}
  </Container>
)

export default MessageContent
