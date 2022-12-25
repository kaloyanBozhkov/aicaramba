import Image from 'next/image'

import CornerZoom from 'components/organisms/CornerZoom/CornerZoom.organism'

import { Box, Grid } from '@mantine/core'

import styles from './styles.module.scss'

const ProductPreview = ({ imgSrc, zoomTitle }: { imgSrc: string; zoomTitle: string }) => (
  <Grid className={styles.productPreview} columns={2}>
    <Grid.Col span={2}>
      <Box className={styles.imgContainer}>
        <CornerZoom zoomTitle={zoomTitle} src={imgSrc} isAbsolute />
        <Image src={imgSrc} width={1000} height={1000} alt={zoomTitle} />
      </Box>
    </Grid.Col>
  </Grid>
)

export default ProductPreview
