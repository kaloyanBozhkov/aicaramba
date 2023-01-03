import { useMediaQuery } from '@mantine/hooks'

const useTabletCheck = ({
  onlyPortrait,
  tabletSizeTarget = 'all',
  initialValue = false,
}: {
  onlyPortrait?: boolean
  tabletSizeTarget?: 'all' | 'small' | 'big' | 'smallish'
  initialValue?: boolean
} = {}) => {
  const isTabletPortrait = useMediaQuery(tabletSizes[`${tabletSizeTarget}Portrait`], initialValue, {
      getInitialValueInEffect: false,
    }),
    isTabletLandscape = useMediaQuery(tabletSizes[`${tabletSizeTarget}Landscape`])

  return isTabletPortrait || (!onlyPortrait && isTabletLandscape)
}

export default useTabletCheck

const tabletSizes = {
  smallishLandscape: '(min-height: 600px) and (max-width: 765px) and (orientation: landscape)',
  smallishPortrait: '(min-width: 600px) and (max-width: 765px) and (orientation: portrait)',
  smallPortrait: '(min-width: 600px) and (max-width: 900px) and (orientation: portrait)',
  bigPortrait: '(min-width: 901px) and (max-width: 1199px) and (orientation: portrait)',
  smallLandscape: '(min-height: 600px) and (max-width: 980px) and (orientation: landscape)',
  bigLandscape: '(min-height: 981px) and (max-width: 1199px) and (orientation: landscape)',
  allPortrait: '(min-width: 600px) and (max-width: 1199px) and (orientation: portrait)',
  allLandscape: '(min-width: 600px) and (max-width: 1199px) and (orientation: landscape)',
}
