import { useEffect, useState } from 'react'

const useTabletCheck = (
  {
    onlyPortrait,
    tabletSizeTarget = 'all',
  }: {
    onlyPortrait?: boolean
    tabletSizeTarget?: 'all' | 'small' | 'big'
  } = { onlyPortrait: false, tabletSizeTarget: 'all' }
) => {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const updateIsTablet = () => {
      const isTablet =
        window.matchMedia(tabletSizes[`${tabletSizeTarget}Portrait`]).matches ||
        (!onlyPortrait && window.matchMedia(tabletSizes[`${tabletSizeTarget}Landscape`]).matches)

      setIsTablet(isTablet)
    }

    // run initially on mount
    updateIsTablet()

    window.addEventListener('resize', updateIsTablet)

    return () => window.removeEventListener('resize', updateIsTablet)
  }, [onlyPortrait, tabletSizeTarget])

  return isTablet
}

export default useTabletCheck

const tabletSizes = {
  smallPortrait: '(min-width: 599px) and (max-width: 980px) and (orientation: portrait)',
  bigPortrait: '(min-width: 981px) and (max-width: 1199px) and (orientation: portrait)',
  smallLandscape: '(min-height: 599px) and (max-width: 980px) and (orientation: landscape)',
  bigLandscape: '(min-height: 981px) and (max-width: 1199px) and (orientation: landscape)',
  allPortrait: '(min-width: 599px) and (max-width: 1199px) and (orientation: portrait)',
  allLandscape: '(min-width: 599px) and (max-width: 1199px) and (orientation: landscape)',
}
