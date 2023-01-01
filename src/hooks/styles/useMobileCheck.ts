import { useMediaQuery } from '@mantine/hooks'

const useMobileCheck = ({
  onlyPortrait = false,
  initialValue = false,
}: {
  onlyPortrait?: boolean
  initialValue?: boolean
} = {}) => {
  const isMobilePortrait = useMediaQuery(mobileSizes.portrait, initialValue, {
      getInitialValueInEffect: false,
    }),
    isMobileLandscape = useMediaQuery(mobileSizes.landscape)

  return isMobilePortrait || (!onlyPortrait && isMobileLandscape)
}

export default useMobileCheck

const mobileSizes = {
  portrait: '(max-width: 599px) and (orientation: portrait)',
  landscape: '(max-height: 599px) and (orientation: landscape)',
}
