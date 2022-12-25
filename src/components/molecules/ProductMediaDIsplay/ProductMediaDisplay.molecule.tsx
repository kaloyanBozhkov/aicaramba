import CanvasImageDisplay from 'components/molecules/CanvasImageDisplay/CanvasImageDisplay.molecule'

import { Grid } from '@mantine/core'

import styles from './styles.module.scss'

const ProductMediaDisplay = ({
  canvasDisplayImgSrc,
  zoomTitle,
}: {
  canvasDisplayImgSrc?: string
  zoomTitle?: string
}) => {
  return (
    <Grid className={styles.productMediaDisplay}>
      {canvasDisplayImgSrc && (
        <Grid.Col span={5} className={styles.canvasDisplayWrapper}>
          <CanvasImageDisplay imgSrc={canvasDisplayImgSrc} zoomTitle={zoomTitle} />
        </Grid.Col>
      )}
    </Grid>
  )
}
export default ProductMediaDisplay
