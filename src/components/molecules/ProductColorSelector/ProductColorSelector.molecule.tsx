import { Group, Stack } from '@mantine/core'
import { Color } from '@prisma/client'

import ShirtPreview from '../ShirtPreview/ShirtPreview.molecule'

import styles from './styles.module.scss'

const ProductColorSelector = ({
  onColorSelected,
  activeColor,
  imgSrc,
}: {
  onColorSelected: (color: Color) => void
  activeColor: Color
  imgSrc: string
}) => (
  <Stack className={styles.productColorSelector}>
    <p>
      <b>COLOR:</b> <span>{activeColor}</span>
    </p>
    <Group className={styles.shirtWrapper}>
      <ShirtPreview
        className={styles.shirtImg}
        shirtColor="black"
        data-active={activeColor === Color.BLACK}
        imgSrc={imgSrc}
        onClick={() => onColorSelected(Color.BLACK)}
      />
      <ShirtPreview
        className={styles.shirtImg}
        shirtColor="white"
        data-active={activeColor === Color.WHITE}
        imgSrc={imgSrc}
        onClick={() => onColorSelected(Color.WHITE)}
      />
    </Group>
  </Stack>
)

export default ProductColorSelector
