import { useMediaQuery } from '@mantine/hooks'

const useDesktopCheck = (initialValue = false) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)', initialValue, {
    getInitialValueInEffect: false,
  })
  return isDesktop
}

export default useDesktopCheck
