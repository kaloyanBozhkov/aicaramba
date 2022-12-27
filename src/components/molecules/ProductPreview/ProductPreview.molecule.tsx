import Image from 'next/image'
import Link from 'next/link'

import CornerZoom from 'components/organisms/CornerZoom/CornerZoom.organism'

import { Box, Grid, Stack, Text } from '@mantine/core'

import ShirtPreview from '../ShirtPreview/ShirtPreview.molecule'

import styles from './styles.module.scss'

const ProductPreview = ({ imgSrc, zoomTitle }: { imgSrc: string; zoomTitle: string }) => {
  const artwork = <Image priority src={imgSrc} width={1000} height={1000} alt={zoomTitle} />,
    whiteShirtPreview = <ShirtPreview imgSrc={imgSrc} shirtColor="white" />,
    blackShirtPreview = <ShirtPreview imgSrc={imgSrc} shirtColor="black" />

  return (
    <Stack className={styles.productPreview}>
      <Box className={styles.imgContainer}>
        <CornerZoom zoomTitle={zoomTitle} isAbsolute>
          {artwork}
        </CornerZoom>
        {artwork}
      </Box>
      <Grid columns={2}>
        <Grid.Col span={2} xs={1} pos="relative">
          <CornerZoom isAbsolute zoomTitle={`Black T-Shirt Preview: ${zoomTitle}`}>
            {blackShirtPreview}
          </CornerZoom>
          {blackShirtPreview}
        </Grid.Col>
        <Grid.Col span={2} xs={1} pos="relative">
          <CornerZoom isAbsolute zoomTitle={`White T-Shirt Preview: ${zoomTitle}`}>
            {whiteShirtPreview}
          </CornerZoom>
          {whiteShirtPreview}
        </Grid.Col>
        <Grid.Col span={2}>
          <Text className={styles.previewText}>
            <b>NOTE:</b> The above T-Shirts are only for preview and they do not exist yet. The
            truly unique T-Shirt is tagged with a QR code and will be created only once the artwork
            is claimed and the owner has chosen its custom size & color.{' '}
            <Link href="/faq">Need more info? Check out the FAQ.</Link>
          </Text>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
export default ProductPreview
