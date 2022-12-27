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
  zoomTitle: string
}) => {
  const image = <Image src={imgSrc} alt="Drawing placed on canvas" width={1000} height={1000} />
  return (
    <div className={styles.canvasImageDisplay} data-fluid={fluid}>
      <div>
        <CornerZoom isAbsolute zoomTitle={zoomTitle}>
          {image}
        </CornerZoom>
        {image}
      </div>
      <Image
        src="/assets/images/canvas.png"
        alt="canvas with an image on top"
        width={378}
        height={943}
      />
    </div>
  )
}

export default CanvasImageDisplay
