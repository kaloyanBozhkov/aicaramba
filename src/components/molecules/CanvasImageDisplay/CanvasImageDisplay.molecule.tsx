import Image from 'next/image'

import CornerZoom from 'components/organisms/CornerZoom/CornerZoom.organism'

// import canvasSrc from 'common/assets/images/canvas.png'
import styles from './styles.module.scss'

const CanvasImageDisplay = ({
  imgSrc,
  fluid = false,
  zoomTitle,
}: {
  imgSrc: string
  fluid?: boolean
  zoomTitle?: string
}) => (
  <div className={styles.canvasImageDisplay} data-fluid={fluid}>
    <div>
      {zoomTitle && <CornerZoom isAbsolute src={imgSrc} zoomTitle={zoomTitle} />}
      <Image src={imgSrc} alt="Drawing placed on canvas" width={1000} height={1000} />
    </div>
    <Image
      src="/assets/images/canvas.png"
      alt="canvas with an image on top"
      width={378}
      height={943}
    />
  </div>
)

export default CanvasImageDisplay
