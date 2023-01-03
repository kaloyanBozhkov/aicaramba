import { ReactNode } from 'react'

import Wave from 'components/atoms/Wave/Wave.atom'

import { Stack } from '@mantine/core'
import type { ProductStatus } from '@prisma/client'

import styles from './styles.module.scss'

const PageHeader = ({
  title,
  background,
}: {
  title: ReactNode | string
  background: ProductStatus | 'search'
}) => (
  <div
    className={styles.pageHeader}
    data-background={background}
    data-color={['NEW', 'FIRE'].includes(background) ? 'dark' : 'bright'}
  >
    <Stack className={styles.content} justify="center">
      {title}
    </Stack>
    <Wave position="bottom" />
  </div>
)

export default PageHeader
