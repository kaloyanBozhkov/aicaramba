import { type MouseEventHandler, type ReactElement, useCallback, useRef, useState } from 'react'

import styles from './styles.module.scss'

const Magnifier = ({
  children,
  zoomLevel = 1.5,
}: {
  zoomLevel?: number
  children: ReactElement
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
          xPerc = (-x * 100) / zoomRef.current.clientWidth,
          yPerc = (-y * 100) / zoomRef.current.clientHeight

        zoomRef.current.style.transform = `translate(${xPerc}%, ${yPerc}%) scale(${zoomLevel}, ${zoomLevel})`
      },
      [zoomRef, zoomLevel]
    )
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.contentWrapper}
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
      >
        {children}
      </div>
      <div ref={zoomRef} className={styles.zoomLens} data-showing={showMagnifier}>
        {children}
      </div>
    </div>
  )
}

export default Magnifier
