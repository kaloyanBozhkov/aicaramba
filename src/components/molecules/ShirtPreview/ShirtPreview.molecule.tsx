import Image from 'next/image'

import { Box, type BoxProps, Stack, Text } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const ShirtPreview = ({
  imgSrc,
  shirtColor,
  className,
  onClick,
  ...boxProps
}: {
  imgSrc: string
  shirtColor: 'black' | 'white'
  className?: string
  onClick?: () => void
} & Partial<BoxProps>) => (
  <Box
    className={extendClassNameProp(styles.shirtPreview, className)}
    onClick={onClick}
    {...boxProps}
  >
    <div className={styles.preview} data-shirt={shirtColor}>
      <Image
        className={styles.blurImg}
        priority
        src={imgSrc}
        width={1000}
        height={1000}
        alt="preview of shirt"
      />
      <div className={styles.imgOnShirt} style={{ backgroundImage: `url(${imgSrc})` }} />
    </div>
    <Image
      className={styles.shirt}
      priority
      src={`/assets/images/shirt-${shirtColor}.jpg`}
      width={375}
      height={500}
      alt={`${shirtColor} shirt`}
    />
  </Box>
)

export default ShirtPreview
