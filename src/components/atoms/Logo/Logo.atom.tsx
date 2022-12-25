import Image from 'next/image'

import { Box } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const Logo = ({
  className,
  compress = { height: 80, width: 80, quality: 75, priority: true },
  ...size
}: {
  className?: string
  width?: string
  height?: string
  compress?: {
    width: number
    height: number
    quality?: number
    priority?: boolean
  }
}) => (
  <Box style={{ ...size }} className={extendClassNameProp(styles.logo, className)}>
    <Image src="/assets/images/logo.jpg" alt="logo" draggable="false" {...compress} />
  </Box>
)

export default Logo
