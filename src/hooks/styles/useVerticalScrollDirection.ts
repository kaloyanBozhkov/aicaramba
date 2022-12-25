import { useEffect, useRef, useState } from 'react'

type ScrolLDir = 'down' | 'up' | 'base'

/**
 * Returns "base" when within endAt or startAt, "down" when scrolling down past startAt or "up" when scrolling up past startAt
 */
const useVerticalScrollDirection = ({ endAt, startAt }: { endAt: number; startAt: number }) => {
  const [scrollDir, setScrollDir] = useState<ScrolLDir>('base'),
    lastScrollTop = useRef(0),
    // used to prevent "down" before doing at least one "up".
    prevScrollDir = useRef<ScrolLDir>('base'),
    setScrollDirAndPrevScrollDir = (dir: ScrolLDir) => {
      setScrollDir((prev) => {
        prevScrollDir.current = prev
        return dir
      })
    }

  useEffect(() => {
    const updateScrollDir = () => {
      const curr = window.pageYOffset || document.documentElement.scrollTop

      if (curr >= startAt) {
        if (curr > lastScrollTop.current) {
          if (prevScrollDir.current === 'up') {
            setScrollDirAndPrevScrollDir('down')
          } else {
            setScrollDirAndPrevScrollDir('base')
          }
        } else {
          setScrollDirAndPrevScrollDir('up')
        }
      } else if (curr <= endAt) {
        setScrollDirAndPrevScrollDir('base')
      }

      lastScrollTop.current = curr
    }

    document.addEventListener('scroll', updateScrollDir)

    return () => document.removeEventListener('scroll', updateScrollDir)
  }, [endAt, startAt])

  return scrollDir
}

export default useVerticalScrollDirection
