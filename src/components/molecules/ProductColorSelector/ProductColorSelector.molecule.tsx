import Image from 'next/image'

import { Group, Stack } from '@mantine/core'
import { Color } from '@prisma/client'

import styles from './styles.module.scss'

const ProductColorSelector = ({
  onColorSelected,
  activeColor,
}: {
  onColorSelected: (color: Color) => void
  activeColor: Color
}) => {
  return (
    <Stack className={styles.productColorSelector}>
      <p>
        <b>COLOR:</b> <span>{activeColor}</span>
      </p>
      <Group className={styles.shirtWrapper}>
        {/* map if this grows */}
        <Image
          data-active={activeColor === Color.BLACK}
          src="/assets/images/shirt-black.jpeg"
          alt="black shirt"
          onClick={() => onColorSelected(Color.BLACK)}
          width={375}
          height={500}
        />
        <Image
          data-active={activeColor === Color.WHITE}
          src="/assets/images/shirt-white.jpeg"
          alt="white shirt"
          onClick={() => onColorSelected(Color.WHITE)}
          width={375}
          height={500}
        />
      </Group>
    </Stack>
  )
}
export default ProductColorSelector
