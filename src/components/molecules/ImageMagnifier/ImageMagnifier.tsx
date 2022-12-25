import { MouseEventHandler, useCallback, useRef, useState } from 'react'

import Image from 'next/image'

import styles from './styles.module.scss'

const ImageMagnifier = ({
  src,
  width,
  height,
  zoomLevel = 1.5,
}: {
  src: string
  width?: number
  height?: number
  zoomLevel?: number
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false),
    zoomRef = useRef<HTMLDivElement>(null),
    updatePos = useCallback<MouseEventHandler<HTMLImageElement>>(
      (e) => {
        if (!zoomRef.current) return
        // update cursor position
        const elem = e.currentTarget,
          { top, left } = elem.getBoundingClientRect(),
          // calculate cursor position on the image
          x = e.pageX - left - window.pageXOffset,
          y = e.pageY - top - window.pageYOffset,
          capX = zoomRef.current.clientWidth / zoomLevel,
          capY = zoomRef.current.clientHeight / zoomLevel

        let nX = x,
          nY = y

        if (nX > capX) nX = capX
        else if (nX < 30) nX = 0
        if (nY > capY) nY = capY
        else if (nY < 30) nY = 0

        zoomRef.current.style.backgroundPositionX = `${-nX * zoomLevel}px`
        zoomRef.current.style.backgroundPositionY = `${-nY * zoomLevel}px`
        zoomRef.current.style.backgroundSize = `${zoomRef.current.clientWidth * zoomLevel}px ${
          zoomRef.current.clientHeight * zoomLevel
        }px`
      },
      [zoomRef, zoomLevel]
    )

  return (
    <div className={styles.wrapper}>
      <Image
        src={src}
        height={height}
        width={width}
        style={{
          height: 'auto',
          maxWidth: '100%',
        }}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseMove={updatePos}
        onMouseLeave={() => setShowMagnifier(false)}
        onTouchStart={() => setShowMagnifier(true)}
        onTouchMove={(e) =>
          updatePos({
            currentTarget: e.currentTarget,
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY,
          } as any)
        }
        onTouchEnd={() => setShowMagnifier(false)}
        alt="preview"
      />

      <div
        ref={zoomRef}
        className={styles.zoomLens}
        style={{
          backgroundImage: `url('${src}')`,
        }}
        data-showing={showMagnifier}
      ></div>
    </div>
  )
}

export default ImageMagnifier
