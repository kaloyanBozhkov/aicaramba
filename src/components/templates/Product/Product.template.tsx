import { ReactNode } from 'react'

import { Group, Stack } from '@mantine/core'

import styles from './styles.module.scss'

const ProductTemplate = ({
  leftSide,
  rightSide,
}: {
  leftSide: ReactNode
  rightSide: ReactNode
}) => (
  <Group className={styles.productTemplate}>
    <Stack>{leftSide}</Stack>
    <Stack>{rightSide}</Stack>
  </Group>
)
export default ProductTemplate
