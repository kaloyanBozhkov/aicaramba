import { ReactNode } from 'react'

import { Stack, StackProps } from '@mantine/core'

import styles from './styles.module.scss'

const PageStack = ({ children, ...props }: { children: ReactNode } & Partial<StackProps>) => (
  <Stack className={styles.pageStack} {...props}>
    {children}
  </Stack>
)

export default PageStack
