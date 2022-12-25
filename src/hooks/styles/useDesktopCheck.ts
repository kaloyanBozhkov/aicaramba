import useMobileCheck from './useMobileCheck'
import useTabletCheck from './useTabletCheck'

const useDesktopCheck = () => {
  const isMobile = useMobileCheck(),
    isTablet = useTabletCheck()

  return !isMobile && !isTablet
}

export default useDesktopCheck
