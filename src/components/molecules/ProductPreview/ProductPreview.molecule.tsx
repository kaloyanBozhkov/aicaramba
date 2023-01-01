import Image from 'next/image'
import Link from 'next/link'

import CornerZoom from 'components/organisms/CornerZoom/CornerZoom.organism'

import { Box, Grid, Stack, Text } from '@mantine/core'
import type { ProductStatus } from '@prisma/client'

import ArtworkModalTitle from '../ArtworkModalTitle/ArtworkModalTitle'
import ShirtPreview from '../ShirtPreview/ShirtPreview.molecule'

import styles from './styles.module.scss'

const ProductPreview = ({
  imgSrc,
  zoomTitle,
  status,
}: {
  imgSrc: string
  zoomTitle: string
  status: ProductStatus
}) => {
  const artwork = <Image priority src={imgSrc} width={1000} height={1000} alt={zoomTitle} />

  return (
    <Stack className={styles.productPreview}>
      <Box className={styles.imgContainer}>
        <CornerZoom zoomTitle={<ArtworkModalTitle title={zoomTitle} status={status} />} isAbsolute>
          {artwork}
        </CornerZoom>
        {artwork}
      </Box>
      <Grid columns={2}>
        <Grid.Col span={2} xs={1} pos="relative">
          <Box pos="relative">
            <CornerZoom isAbsolute zoomTitle="Preview: Black T-Shirt">
              <ShirtPreview imgSrc={imgSrc} shirtColor="black" style={{ width: '375px' }} />
            </CornerZoom>
            <ShirtPreview imgSrc={imgSrc} shirtColor="black" style={{ width: '100%' }} />
          </Box>
        </Grid.Col>
        <Grid.Col span={2} xs={1}>
          <Box pos="relative">
            <CornerZoom isAbsolute zoomTitle="Preview: White T-Shirt">
              <ShirtPreview imgSrc={imgSrc} shirtColor="white" style={{ width: '375px' }} />
            </CornerZoom>
            <ShirtPreview imgSrc={imgSrc} shirtColor="white" style={{ width: '100%' }} />
          </Box>
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
